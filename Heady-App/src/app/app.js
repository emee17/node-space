const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('../db-configuration/db-conf')

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const categoriesRoutes = require('../routes/categories-routes')
const productsRoutes = require('../routes/products-routes')

app.use('/api/categories', categoriesRoutes)
app.use('/api/products',  productsRoutes)

/** Default URI related response */
app.use((request, response, next) => {
    const error = new Error(` Not Found `)
    error.status = 404
    next(error)
})

/**Any error happens that is not handled then this response will gets generate */
app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({
        error: {
            message: `Internal Server Error`
        }
    })
})

module.exports = app