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
routes.get('/messages/count-not-viewed-messages', MessagesController.countNotViewedMessages)
routes.patch('/messages/mark', MessagesController.mark)
routes.get('/messages/count/:contact_id', MessagesController.count)
routes.get('/messages/:contact_id', MessagesController.index)
routes.put('/messages/:uuid', MessagesController.update)

module.exports = routes
