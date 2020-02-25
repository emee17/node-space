/** BismillaHirrahmanNirrahim Start */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express();

const coderRoutes = require('./api/controller/coder')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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