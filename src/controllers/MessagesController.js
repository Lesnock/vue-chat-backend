const Controller = require('./Controller')

// Database
const db = require('../database')

class MessagesController extends Controller {
  async index(req, res) {
    const { loggedUserId, receiverId, offset } = req.params

    try {
      // Get Messages ordered by date with 'reverse' LIMIT
      const messages = await db.raw(`
        SELECT * FROM (
          SELECT * FROM messages
          WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)
          ORDER BY date DESC
          LIMIT 20
          OFFSET ?
        ) subquery
        ORDER BY date ASC
      `, [loggedUserId, receiverId, receiverId, loggedUserId, offset])

      return res.json(messages)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }

  async notViewedMessagesCount(req, res) {
    const { userId } = req.params

    try {
      let messages = await db('messages')
        .where('recipient_id', userId)
        .where('viewed', false)

      const notViewdMessages = {}

      // Count messages for each user
      messages.forEach(message => {
        if (!notViewdMessages[message.sender_id]) {
          notViewdMessages[message.sender_id] = 0
        }

        notViewdMessages[message.sender_id]++
      })

      return res.json(notViewdMessages)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }

  // Mark all messages viewed from a specific sender and recipient
  async markAsViewed(req, res) {
    const { recipientId, senderId } = req.params

    try {
      await db('messages')
        .where('sender_id', senderId)
        .where('recipient_id', recipientId)
        .update({ viewed: true })

      res.send()
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  }
}

module.exports = new MessagesController()
