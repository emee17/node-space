// System Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//MOngoose Database 
const mongoose = require('mongoose')

//additional Routes imports
const productRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://node-shop:'+process.env.MONGOOSE_ATLAS_PASSWORD+'@node-shop-uyzpz.mongodb.net/test?retryWrites=true&w=majority'
//,{useMongoClient : true}
,{useNewUrlParser:true} 
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use((request,response,next)=>{
    response.header({'Acces-Control-Allow-Origin':'*'});
    response.header({'Acces-Control-Allow-Header':'Orgin, X-Requested-with, Conten-Type, Accept, Authorization'});

    if(request.method === 'option')
    {
        response.header({'Acces-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'})
    }
    next();
})

app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
app.use('/user',userRoutes);

//if uri related errors
app.use((request,response,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
//if any error comes
app.use((error,request,response,next)=>{
    response.status(error.status || 500);
    response.json({
        error:{
            message: "My custome Message : "+error.message
        }
    })
})
/* app.use((request,response,next)=>
{
    response.status(200).json({
        message : "Alhamdulillah! It works"
    });
}); */

module.exports = app;