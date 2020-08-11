const { Router } = require('express')
const routes = new Router()

// Controllers
const LoginController = require('./controllers/LoginController')
const UsersController = require('./controllers/UsersController')
const MessagesController = require('./controllers/MessagesController')

routes.post('/login', LoginController.authenticate)

routes.get('/users', UsersController.index)
routes.get('/users/:username', UsersController.show)

routes.get('/messages/:loggedUserId/:receiverId', MessagesController.index)

module.exports = routes
