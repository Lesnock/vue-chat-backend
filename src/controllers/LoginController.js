const Controller = require('./Controller')

// Database
const db = require('../database')

class LoginController extends Controller {
  async authenticate(req, res) {
    const { username, password } = req.body

    const user = await db('users').where('username', username).first()

    if (!user) {
      return res.status(401).json({
        error: 'Credenciais incorretas'
      })
    }

    // TODO: criptografar senha
    if (password !== user.password) {
      return res.status(401).json({
        error: 'Credenciais incorretas'
      })
    }

    return res.status(200).json(user)
  }
}

module.exports = new LoginController()
