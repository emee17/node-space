const mongoose = require('mongoose')
/***
 * 
 * Product Schema
 */
const productSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    productName : {
        type : String,
        required: true,
        minlength : 3
    },
    price : {
        type : Number,
        required : true,
    },
    categories : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'category'
    }]
})

module.exports = mongoose.model('product', productSchema)