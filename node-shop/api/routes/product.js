const express = require('express')
const routes = express.Router();
const mongoose = require('mongoose');

const Product = require('../model/product')

routes.get('/',(request,response,next)=>{
    
    Product.find().select('_id name price').exec()
    .then(data => {
        const resp = {
            count : data.length,
            products:data.map( doc =>{
                return {
                    id : doc._id,
                    name:doc.name,
                    price:doc.price,
                    requestUrl:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+doc._id
                    }
                }
            })
        }
        response.status(200).json(resp);
    }).catch(error => {
        response.status(500).json({
            error : error
        })
    });
});

routes.get('/:id',(request,response,next)=>{
    const id = request.params.id;

    Product.findById(id).select('_id name price').exec().then(data=>{
        console.log(`Data from DB ${data}`);
        if(data){
            response.status(200).json(data);
        }else{
            response.status(404).json({message:'Data not found for this ID'});
        }
    }).catch(error=>{
    console.log(`Error While fetching Data from DB ${error}`);
    response.status(500).json({error:error});
    });
});

routes.post('/',(request,response,next)=>{

    const product = new Product({
        _id : new mongoose.Types.ObjectId,
        name : request.body.name,
        price : request.body.price
    });
    product.save().then(result =>{
        console.log('result : '+result);
        response.status(201).json({
            message : "Alhamdulillah Handling POST Request called",
            product : result
        })
    }).catch(err=>{
        console.log('error : '+err); 
    })
    
});

routes.put('/:id',(request,response,next)=>{
    const id = request.params.id;
    const updateOps = {};
    console.log('0 ')
    for(const ops of request.body){
        updateOps[ops.propName] = ops.value; console.log('1 ',ops.propName)
    }
    Product.updateOne({_id:id},{$set : updateOps }).exec()
        .then(data =>{
            console.log(`Updated data : ${data}`)
            response.status(200).json({message : 'Updated Succesfully ',data:data})
        })
        .catch(error=>{
            console.log(`Error Occured while updating data : ${error}`)
            response.status(500).json({
                message : 'Something wrong happened',
                error:error.message
            })
        })
    //this will take full payload and update all fields
    //Product.update({id:id},{$set : {name: request.body.newName,price: request.body.newPrice}})
});

routes.delete('/:id',(request,response,next)=>{
    const id = request.params.id;

    Product.deleteOne({_id:id}
        /* , (error)=>{
        if(error) response.status(500).json({error : error});
        else response.status(200).json({response :{message : "deleted Succesfully"}});
    }); */
    ).exec()
    .then(result =>{
        console.log(result)
        response.status(200).json({message : 'Deleted Succesfully ',result:result})
    }).catch(error =>{
        console.log(`Error Occured while Deleteing data : ${error}`)
            response.status(500).json({
                message : 'Something wrong happened',
                error:error.message
            })
    })
    
});

module.exports = routes;