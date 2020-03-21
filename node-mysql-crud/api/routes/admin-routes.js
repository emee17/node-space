const express = require('express')
const routes = express.Router()
const adminService = require('../service/admin-service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

routes.post('/login', (request, response)=>{
    const admin = request.body
    
    if(admin){
        adminService.findByEmail(admin.email,(error, result)=>{
            if(error){
                return response.status(500).json({error:error.message})
            }
            if(result){
                if(result.role ==='user'){
                    return response.status(401).json({
                        message :'Auth Failed : '+error
                    })
                }
                bcrypt.compare(admin.password,result.password, (err, resp)=>{
                    if(err){
                        return response.status(401).json({
                            message :'Auth Failed : '+err.message
                        })
                    }
                    if(resp){  
                        const jToken = jwt.sign(
                            {
                                id:result.id,
                                email:result.email,
                                name: result.name,
                                role:result.role
                            },
                            process.env.JWT_KEY, 
                            {
                                expiresIn:'1h'
                            }
                        );
                        return response.status(200).json({
                            token : jToken
                        })
                    }
                    return response.status(401).json({
                        message :'Auth Failed : '
                    })
                })
            }
        })
    }else{
        return response.status(401).json({
            message :'Auth Failed : m'
        })
    }
})

module.exports = routes