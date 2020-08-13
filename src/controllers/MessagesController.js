const Controller = require('./Controller')

// Database
const db = require('../database')

class MessagesController extends Controller {
  async index(req, res) {
    const { loggedUserId, receiverId } = req.params

    try {
      const messages = await db('messages')
        .whereRaw(
          '(sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)',
          [loggedUserId, receiverId, receiverId, loggedUserId]
        )

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
