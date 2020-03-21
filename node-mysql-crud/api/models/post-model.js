/* const Avenger = (avenger) =>{
    this.name = avenger.name;
    this.description = avenger.description;
} */
class Post{
    constructor(post){
        this.id = post.id
        this.name = post.name;
        this.description = post.description;
        this.createdBy = post.createdBy;
        this.date = post.date;
    }
}

module.exports = Post;