const express = require('express')
const routes = express.Router();
const dbConnection = require('../configuration/db-configuration')

routes.get('/',(request,response,next)=>{
    response.status(200).json({
        message : 'Alhamdulillah API working Successfully'
    })
})

/** End exports */
module.exports = routes

