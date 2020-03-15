const express = require('express')
const routes = express.Router();
const jwt = require("jsonwebtoken")
const avengerService = require('../service/avenger-service')
const bcrypt = require('bcrypt')

routes.post('/login',(request, response, next)=>{
    const user = request.body
    if(user){
        avengerService.findByEmail(user.email,(error, result)=>{
            if(error){
                return response.status(401).json({ message : 'Auth Failed in query : '+error.message })
            }
            if(result){ 
            
                bcrypt.compare(user.password, result.password, (err, resp)=>{
                    if(err){
                        return response.status(401).json({ message : 'Auth Failed bcrypt : '+err.message})
                    }
                    if(resp){
                        const jToken = jwt.sign(
                            {
                                id : result.id,
                                email : result.email,
                                role : result.role
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn : '1h'
                            }
                        )
                        return response.status(200).json({
                            token : jToken
                        })
                    }
                    return response.status(401).json({ message : 'Auth Failed bcrypt out     : '})
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