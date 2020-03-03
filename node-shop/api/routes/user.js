const express = require('express')
const routes = express.Router();

const userController = require('../controller/user')

routes.get('/', userController.getUser)

routes.post('/login',userController.signIn)

routes.post('/signup',userController.signUp)

module.exports = routes;