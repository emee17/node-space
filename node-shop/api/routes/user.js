const express = require('express')
const routes = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user')

routes.get('/', (request, response, next)=>{

    User.find().exec().then(users =>{
        response.status(200).json({
            count : users.length,
            users:users
        })
    }).catch(error=>{
        response.status(500).json({
            error:error
        })
    })
})

routes.post('/login',(request, response, next)=>{

    User.find({email:request.body.email}).exec()
    .then(user=>{
        if(user.length < 1){
            return response.status(401).json({
                message: 'Auth Failed'
            })
        }
        bcrypt.compare(request.body.password, user[0].password , (err, res)=>{
            if(err){
                return response.status(401).json({
                    message: 'Auth Failed'
                })
            }
            if(res){ //valid
                const jToken = jwt.sign(
                    {
                        id:user[0]._id,
                        email:user[0].email
                    },
                    process.env.JWT_KEY, 
                    {
                        expiresIn:'1h'
                    }
                    )
                return response.status(200).json({
                    message: 'Loggge in',
                    token:jToken
                })
            }
            return response.status(401).json({
                message: 'Auth Failed'
            })
        })
    })
    .catch(error=>{
        response.status(500).json({
            error:error
        })
    })

})
routes.post('/signup',(request,response,next)=>{

    User.find({email:request.body.email}).exec()
    .then(result=>{
        if(result.length > 0){
            response.status(409).json({
                message:'email exist'
            })
        }else{
            bcrypt.hash(request.body.password, 10, (error,hash)=>{
                if(error){
                    return response.status(500).json({
                        message:" password not found :TheCoder : "+error
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: request.body.email,
                        password:hash
                    })
        
                    user.save()
                    .then(result=>{
                        response.status(200).json(result)
                    })
                    .catch(error=>{
                        response.status(500).json({
                            error:error.message
                        })
                    })
                }
            })
        }
    })
    .catch(error=>{
        response.status(500).json(error)
    })
    
})

module.exports = routes;