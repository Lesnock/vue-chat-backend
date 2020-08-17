const Controller = require('./Controller')

// Database
const db = require('../database')

class UsersController extends Controller {
  async index(req, res) {
    try {
      const users = await db('users')

      return res.json(users)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async show(req, res) {
    const { username } = req.params

    const user = await db('users').where('username', username).first()

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    return res.json(user)
  }
}

module.exports = new UsersController()
