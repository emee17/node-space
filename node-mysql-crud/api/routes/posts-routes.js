const express = require('express')
const routes = express.Router()
const auth = require('../auth/authentication')
const postService = require('../service/posts-service')
const Post = require('../models/post-model')

const role = require('../auth/role-authorization')

routes.post('/', auth, async(request, response, next)=>{

    const userRole = request.userData.role
    const createrId = request.userData.id

    if(!userRole){
        await response.status(401).json({
            message : 'un Authorized to access.'
        })
        return
    }

    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/posts', 'POST') 
    if(!valid){
        await response.status(401).json({
            message : 'un Authorized to access.'
        }) 
        return
    }

    var post = new Post({
        name : request.body.name,
        description : request.body.description,
        date : new Date().toISOString().slice(0,10),
        createdBy : createrId
    })

    postService.createPost(post, (error, result)=>{
        if(error){
            response.status(500).json({
                error:error,
            })
            return
        }else{
            response.status(201).json({
                result:result
            })
            return
        }
    })



})

routes.get('/by-creater', auth, async (request, response, next)=>{

    const userRole = request.userData.role
    const createrId = request.userData.id
    
    if(!userRole){
        await response.status(401).json({
            message : 'un Authorized to access.'
        })
        return
    }
    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/posts/by-creater', 'GET') 
    if(!valid){
        await response.status(401).json({
            message : 'un Authorized to access.'
        }) 
        return
    } 
    postService.getAllPostByCreator(createrId, (error, result)=>{
        if(error){
            return response.status(500).json({
                message : "internal server error"
            })
        }else{
            return response.status(200).json(result)
        }
    })
})

routes.get('/', auth, (request, response, next)=>{
    postService.getAllPost((error, result)=>{
        if(error){
            return response.status(error).json({
                message : "internal server error"
            })
        }else{
            return response.status(200).json(result)
        }
    })
})

routes.get('/:id', auth, (request, response, next)=>{
    
})

routes.put('/:id', auth, (request, response, next)=>{
    
})

routes.delete('/:id', auth, async (request, response, next)=>{
    console.log('delete called');
    
    const userRole = request.userData.role

    if(!userRole){
        await response.status(401).json({
            message : 'un Authorized to access.'
        })
        return
    }
    const valid = role.getRoleRoutePrivilegeValue(userRole, '/api/posts/by-creater', 'GET') 
    if(!valid){
        await response.status(401).json({
            message : 'un Authorized to access.'
        }) 
        return
    } 

    const id = request.params.id
    postService.deletePostById(id, (error, result)=>{
        if(error){
            return response.status(error).json({
                message : "internal server error"
            })
        }else{
            return response.status(200).json(result)
        }
    })

})

module.exports = routes