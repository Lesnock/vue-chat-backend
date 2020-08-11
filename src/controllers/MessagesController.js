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
}

module.exports = new MessagesController()
