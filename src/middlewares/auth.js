const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(498).json({
      error: 'Token not provided'
    })
  }

  // Remove the 'Bearer' word
  const [, token] = authorization.split(' ')

  try {
    const payload = jwt.verify(token, authConfig.secret)
    req.userId = payload.id
  } catch (error) {
    return res.status(498).json({
      error: 'Invalid token'
    })
  }

  next()
}
