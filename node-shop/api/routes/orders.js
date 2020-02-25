const express = require('express')
const routes = express.Router();
const mongoose = require('mongoose');

const Order = require('../model/orders')

routes.get('/',(request,response,next)=>{

    Order.find().select('_id name details').exec()
    .then(data =>{
        response.status(200).json(data)
    })
    .catch(error => {
        error : error
    })

    
});

routes.get('/:id',(request,response,next)=>{
    const id = request.params.id;

    response.status(200).json({
        message : "GET order by ID ",
        id:id
    })
});

routes.post('/',(request,response,next)=>{
    const order = new Order({
        _id : new mongoose.Types.ObjectId,
        name : request.body.name,
        details : request.body.details
    });
    order.save().then(success =>{
        response.status(201).json(success)
    }).catch(error =>{
        response.status(500).json({
            error:error.message
        })
    })
    // response.status(200).json({
    //     message : "Alhamdulillah POST Order Created",
    //     order : order
    // })
});

routes.put('/:id',(request,response,next)=>{
    const id = request.params.id;
    response.status(200).json({
        message : "Alhamdulillah PUT Order Update By ID",
        id:id
    })
});

routes.delete('/:id',(request,response,next)=>{
    const id = request.params.id;
    response.status(200).json({
        message : "Alhamdulillah DELETE Order Deleted By ID",
        id:id
    })
});

module.exports = routes;