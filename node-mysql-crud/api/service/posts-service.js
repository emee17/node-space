const dbConnection = require('../configuration/db-configuration')

exports.createPost = (post, result)=>{
    
    dbConnection.query('INSERT INTO POSTS SET ?', post, (err, posts)=>{
        if(err){
            console.log(err,"err");
            
            result(err, null)
        }else{
            result(null,posts)
        }
    })
} 

exports.getAllPost = (result)=>{
    
    dbConnection.query('SELECT * FROM POSTS ', (err, posts)=>{
        if(err){
            result(err, null)
        }else{
            result(null,posts)
        }
    })
} 
exports.getAllPostByCreator = (id, result)=>{
    dbConnection.query('SELECT * FROM POSTS WHERE createdBy = ? ', id, (err, posts)=>{
        if(err){
            result(err, null)
        }
        if(posts.length){
            result(null,posts)
        }
    })
} 
exports.getPostById = (id, result)=>{
    dbConnection.query('SELECT * FROM POSTS WHERE id = ? ', id, (err, posts)=>{
        if(err){
            result(err, null)
        }
        if(posts.length){
            result(null,posts[0])
        }
    })
} 

exports.updatePostById = (id, post, result)=>{
    let fields = field(post)
    let valueArray = valArray(post,id)
    dbConnection.query(`UPDATE POST SET ${fields} WHERE id = ? `, valueArray, (err, posts)=>{
        if(err){
            result(err, null)
        }
        if(posts.length){
            result(null,posts[0])
        }
    })
} 

exports.deletePostById = (id, result)=>{
    dbConnection.query('DELETE FROM POSTS WHERE ID = ? ', id, (err, posts)=>{
        if(err){
            result(err, null)
        }
        if(posts){
            result(null,posts)
        }
    })
} 

var valArray = (post,id)=>{
    let valueArray = []
    if(post.name !=null) {
        valueArray.push(post.name)
    }
    if(post.description!=null) {
        valueArray.push(post.description)
    }
    if(post.date !=null) {
        valueArray.push(post.date)
    }
    valueArray.push(id)
    return valueArray;
}
var field = (post)=>{
    flg = false
    fields = '';
    if(post.name!=null) {
        fields+= "name = ? "; 
        flg = true;
    }
    if(post.description!=null) {
        if(flg) {
            fields+=", "
        }
        fields+= "description = ? "; 
        flg = true;
    }
    if(post.date!=null) {
        if(flg) {
            fields+=", "
        }
        fields+= "date = ? "; 
        flg = true;
    }
    if(post.createdBy!=null) {
        if(flg) {
            fields+=", "
        }
        fields+= "createdBy = ? "; 
        flg = true;
    }
    return fields;
}