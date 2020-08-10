const { Router } = require('express')
const routes = new Router()

// Controllers
const UsersController = require('./controllers/UsersController')
const MessagesController = require('./controllers/MessagesController')

routes.get('/users', UsersController.index)
routes.get('/users/:username', UsersController.show)

routes.get('/messages/:loggedUserId/:receiverId', MessagesController.index)

module.exports = routes
