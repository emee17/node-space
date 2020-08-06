const express = require('express')
const routes = express.Router()

const productsController = require('../controller/products-controller')

routes.post('/', productsController.createProduct)
routes.get('/', productsController.getProducts)
routes.get('/:id', productsController.getProductById)
routes.put('/:id', productsController.updateProductById)
routes.delete('/:id', productsController.deleteProductById)


module.exports = routes
