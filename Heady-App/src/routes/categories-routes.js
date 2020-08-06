const express = require('express')
const routes = express.Router()

const catogriesController = require('../controller/categories-controller')

routes.post('/', catogriesController.createCategory)
routes.get('/', catogriesController.getCategories)
routes.get('/:id', catogriesController.getCategoryById)

module.exports = routes