const express = require('express')
const routes = express.Router();
const mongoose = require('mongoose');

const Order = require('../model/orders')
const Product =require('../model/product')

routes.get('/',(request,response,next)=>{

    Order.find()
    .select('_id product quantity').populate('product','name price')
    .exec()
    .then(data =>{
        response.status(200).json({
            count:data.length,
            orders:data.map((order)=>{
                return {
                    id :order._id,
                    product:order.product,
                    quantity:order.quantity,
                    req:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+order._id
                    }
                }
            })
        })
    })
    .catch(error => {
        error : error
    })

    
});

routes.get('/:id',(request,response,next)=>{
    const id = request.params.id;
    console.log('id : '+id);
    
    Order.findById(id).select('_id product quantity').exec()
    .then(data=>{
        if(!data){
            response.status(400).json({
                message:'404 Order not Found'
            })
        }
        response.status(200).json({
            order:data,
            request:{
                type:'GET',
                url:'http://localhost:3000/orders/'
            }
        })
    }).catch(error=>{
        response.status(500).json({
            error:error
        })
    })
});

routes.post('/',(request,response,next)=>{

    Product.findById(request.body.product).exec()
        .then(product=>{
            if(!product){
                return response.status(404).json({
                    message:'Product not found'
                })
            }
            const order = new Order({
                _id : new mongoose.Types.ObjectId,
                product : request.body.product,
                quantity : request.body.quantity
            });
            return order.save()
        })
        .then(success =>{
        response.status(201).json({
            message:'Order Created',
            req:{
                type:'GET',
                url:'http://localhost:3000/orders/'+success._id
            }
        })
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
    Order.remove({_id : id}).exec()
    .then(success=>{
        response.status(200).json({
            message:'Successfully Deleted',
            req:{
                type:'GET',
                url:'http://localhost:3000/orders/'
            }
        })
    })
    .catch(error=>{
        response.status(500).json({
            message : error
        })
    })
});

module.exports = routes;