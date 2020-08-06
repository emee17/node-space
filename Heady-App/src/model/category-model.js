const mongoose = require('mongoose')

/***
 * 
 * category Schema
 */
const categorySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    categoryName : {
        type : String,
        required: true,
        minlength : 3
    },
    childCategories : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'category'
    }],
    products : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }]
})

module.exports = mongoose.model('category', categorySchema)