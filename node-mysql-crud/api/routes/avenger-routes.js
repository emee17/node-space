const express = require('express')
const routes = express.Router();
//const dbConnection = require('../configuration/db-configuration')
const avengerService  = require('../service/avenger-service')

const Avenger = require('../models/avenger-model')

const auth = require('../auth/authentication')
const role = require('../auth/role-authorization')
const bcrypt = require('bcrypt')
//var aven  = {id:1, name:'Tony',description:'Mark 48'}

/** GET- ALL DATA */
routes.get('/', auth,async (request, response, next)=>{

    const userRole = request.userData.role
    
    if(!userRole){
        await response.status(401).json({
            message : 'un Authorized to access.'
        })
    }
    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/avenger', 'GET')
    if(!valid){
        await response.status(401).json({
            message : 'un Authorized to access.'
        })
    } 
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
routes.get('/:id', auth, (request, response, next)=>{
    
    let userRole = request.userData.role

    if(!userRole){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }
    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/avenger/:id','GET')
    if(!valid){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }

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
routes.post('/', auth, (request, response, next)=>{

    let userRole = request.userData.role
    
    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/avenger','POST')
    if(!valid){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }
    
    bcrypt.hash(request.body.password, 10,(err, hash)=>{
        if(err){
            return response.status(500).json({
                err:err+'ja',
            })
        }else{
            let avenger = new Avenger({
                name : request.body.name,
                email : request.body.email,
                password :hash,
                description: request.body.description,
                role: request.body.role    
            }) 
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
        }

    })
    
})

/** PUT- UPDATE DATA BY ID */
routes.put('/:id', auth, (request, response, next)=>{

    let userRole = request.userData.role
    
    if(!userRole){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }
    let valid = role.getRoleRoutePrivilegeValue(userRole, '/api/avenger/:id', 'PUT')
    
    if(!valid){
        return response.status(401).json({
            message:'The Code un Authorized',
        })
    }
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
routes.delete('/:id', auth, (request, response, next)=>{
    let userRole = request.userData.role

    if(!userRole){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }
    let valid = role.getRoleRoutePrivilegeValue(userRole, '/api/avenger/:id', 'PUT')
    
    if(!valid){
        return response.status(401).json({
            message:'The Code un Authorizzed',
        })
    }
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

