/** BismillaHirrahmanNirrahim Start */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express();

const avengerRoutes = require('./api/routes/avenger-routes')
const userRoutes = require('./api/routes/user-routes')
const adminRoutes = require('./api/routes/admin-routes')
const postsRoutes = require('./api/routes/posts-routes')


app.use(morgan('dev'));//logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors())
app.use((request,response,next)=>{
    response.header({'Access-Control-Allow-Origin': '*'})
    response.header({'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'})
    //response.header({"Access-Control-Request-Headers":"Access-Control-Request-Headers, Content-Type"})

    if(request.method === 'OPTIONS'){
        response.header({'Acces-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE'})
    }
    next()
})

app.use('/api/avenger', avengerRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/posts', postsRoutes)

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