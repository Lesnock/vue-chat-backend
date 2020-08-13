const jwt = require('jsonwebtoken')

const db = require('../database')
const Controller = require('./Controller')
const authConfig = require('../config/auth')

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

    const token = jwt.sign(
      { id: user.id },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    )

    return res.status(200).json({
      user,
      token
    })
  }

  checkToken(req, res) {
    // If request reach here, this means that the token is valid
    // Because it passed through the auth middleware
    return res.status(200).json({
      message: 'Valid token'
    })
  }
}

module.exports = new LoginController()
