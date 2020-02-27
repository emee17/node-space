/** BismillaHirrahmanNirrahim Start */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express();

const coderRoutes = require('./api/routes/avenger-routes')

app.use(morgan('dev'));//logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((request,response,next)=>{
    response.header({'Access-Control-Allow-Origin': '*'})
    response.header({'Access-Control-Allow-Header': 'Origin, X-Requested-with, Content-Type, Accept, Authorization'})

    if(request.method === 'Option'){
        response.header({'Acces-Control-Allow-Methods': 'GET, PUT, POST, DELETE'})
    }
    next()
})

app.use('/api/coder', coderRoutes)

/** URI related errors */
app.use((request,response,next)=>{
    const error = new Error('Not Found :TheCoder')
    error.status = 404
    next(error)
})

/**Any error happens this gets generate */
app.use((error, request, response, next)=>{ 
    response.status(error.status || 500)
    response.json({
        error:{
            message : `${error.message} :TheCoder`
        }
    })
})

/** End exports */
module.exports = app