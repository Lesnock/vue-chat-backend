const { Router } = require('express')
const authMiddleware = require('./middlewares/auth')

const routes = new Router()

// Controllers
const LoginController = require('./controllers/LoginController')
const UsersController = require('./controllers/UsersController')
const MessagesController = require('./controllers/MessagesController')

// Public Routes
routes.post('/login', LoginController.authenticate)

// Private Routes
routes.use(authMiddleware)

routes.get('/check-token', LoginController.checkToken)
routes.get('/users', UsersController.index)
routes.get('/users/:username', UsersController.show)

// Messages
routes.get('/messages/:userId/not-viewed-messages-count', MessagesController.notViewedMessagesCount)
routes.get('/messages/:recipientId/mark-as-viewed/:senderId', MessagesController.markAsViewed)
routes.get('/messages/:loggedUserId/:receiverId/:offset', MessagesController.index)

module.exports = routes
