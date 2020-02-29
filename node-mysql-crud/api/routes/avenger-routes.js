const express = require('express')
const routes = express.Router();
//const dbConnection = require('../configuration/db-configuration')

const avengerService  = require('../service/avenger-service')

const Avenger = require('../models/avenger-model')

//var aven  = {id:1, name:'Tony',description:'Mark 48'}

/** GET- ALL DATA */
routes.get('/', (request, response, next)=>{
    avengerService.findAll((error, result)=>{
        if(error){
            response.status(500).json({
                message: 'Internal Error :TheCoder'
            })
        }else{
            response.status(200).json(result)
        }
    })
})

/** GET- DATA BY ID */
routes.get('/:id', (request, response, next)=>{
    const id = request.params.id
    avengerService.findById(id, (error, result)=>{
        if(error){
            if(error.message = '404'){
                response.status(404).json({
                    message : `404- Data not found for id ${id}`
                })
            }else{
                response.status(500).json({
                    message : `500- Internal Server Error`
                })
            }
        }else{
            response.status(200).json(result)
        }

    })
    /* console.log('Aven : '+aven)
    response.status(200).json({
        avenger:aven,
        message: 'Alhamdulillah GET- DATA BY ID :TheCoder'
    }) */
})

/** POST- CREATE DATA */
routes.post('/', (request, response, next)=>{
    
    let avenger = new Avenger({
        name : request.body.name,
        email : request.body.email,
        description: request.body.description    
    })
    console.log("avenger.name : "+avenger.name)
    avengerService.create(avenger,(error, result)=>{
        if(error){
            response.status(500).json({
                error:error,
            })
        }else{
            response.status(201).json({
                result:result
            })
        }
    })
})

/** PUT- UPDATE DATA BY ID */
routes.put('/:id', (request, response, next)=>{
    const id = request.params.id
    let avenger = new Avenger(request.body)
    avengerService.update(id,avenger, (error,data)=>{
        if(error){
            response.status(500).json({
                error: error.message || 'Internal server error :TheCoder'
            })
        }else{
            response.status(200).json({
                message:'Succesfully updated',
                data:data
            })
        }
    })
})

/** DELETE- DATA BY ID */
routes.delete('/:id', (request, response, next)=>{
    const id = request.params.id
    avengerService.deleteById(id, (error,data)=>{
        if(error){
            response.status(500).json({
                error: error.message || 'Internal server error :TheCoder'
            })
        }else{
            response.status(200).json({
                message:'Succesfully Deleted',
                data:data
            })
        }
    })
})



/** End exports */
module.exports = routes

