const Controller = require('./Controller')

// Database
const db = require('../database')

class MessagesController extends Controller {
  async index(req, res) {
    const { contact_id } = req.params

    const { offset, limit } = req.query

    try {
      // Create subquery for get date asc, and after get date asc
      const subquery = db('messages')
        .where(function () {
          this
            .where('sender_id', req.userId)
            .andWhere('recipient_id', contact_id)
        })
        .orWhere(function () {
          this
            .where('sender_id', contact_id)
            .andWhere('recipient_id', req.userId)
        })
        .orderBy('date', 'desc')

      if (offset) {
        subquery.offset(offset)
      }

      if (limit) {
        subquery.limit(limit)
      } else {
        subquery.limit(50)
      }

      const messages = await db.select('*').from(subquery).orderBy('date', 'asc')

      return res.json(messages)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }

  async update(req, res) {
    const { uuid } = req.params

    const message = await db('messages').where('uuid', uuid).first()

    // Logged user can only mark his received messages
    if (message.recipient_id !== req.userId) {
      return res.status(401).json({
        error: 'Logged user cannot mark messages from other users'
      })
    }

    const {
      text,
      viewed,
      received
    } = req.body

    if (!text & !viewed & !received) {
      return res.send()
    }

    try {
      const mess = await db('messages')
        .where('uuid', uuid)
        .update({
          text,
          viewed,
          received
        })

      return res.send()
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: error.message
      })
    }
  }

  async mark(req, res) {
    const {
      viewed,
      received
    } = req.body

    const query = db('messages')

    // Logged user is considered the recipient
    query.where('recipient_id', req.userId)

    const { sender_id } = req.query

    if (sender_id) {
      query.where('sender_id', sender_id)
    }

    try {
      await query
        .update({
          viewed,
          received
        })

      return res.send()
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: error.message
      })
    }
  }

  async count(req, res) {
    const { contact_id } = req.params

    try {
      const count = await db
        .count('uuid as count')
        .from('messages')
        .where(function () {
          this
            .where('sender_id', req.userId)
            .andWhere('recipient_id', contact_id)
        })
        .orWhere(function () {
          this
            .where('sender_id', contact_id)
            .andWhere('recipient_id', req.userId)
        })

      return res.json({ count: count[0].count })
    } catch (error) {
      return res.json({
        error: error.message
      })
    }
  }

  async countNotViewedMessages(req, res) {
    try {
      const count = await db('messages')
        .select('sender_id')
        .count('uuid as count')
        .where('recipient_id', req.userId) // Logged User is the recipient user
        .where('viewed', false)
        .groupBy('sender_id')


      const reorganized = {} // Reorganize to { sender_id: count }
      count.forEach(({ sender_id, count }) => {
        reorganized[sender_id] = count
      })

      return res.json(reorganized)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new MessagesController()
