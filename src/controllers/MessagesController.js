const Controller = require('./Controller')

// Database
const db = require('../database')

class MessagesController extends Controller {
  async index(req, res) {
    const { loggedUserId, receiverId } = req.params

    try {
      const messages = await db('messages')
        .where('sender_id', loggedUserId)
        .where('recipient_id', receiverId)

      return res.json(messages)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

  }
}

module.exports = new MessagesController()
