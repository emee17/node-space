const mongoose = require('mongoose')
const Product = require('../model/product-model')

module.exports = {
    /**
     * 
     * Create Product by passing name price and list of categories
     */
    createProduct : async (request, response)=>{
        const session = await Product.startSession()
        session.startTransaction()
        try {
            const body = request.body

            const product = await new Product({
                _id: new mongoose.Types.ObjectId,
                productName: body.productName,
                price: body.price,
                categories: body.categories
            })

            const resp = await product.save(session)

            await session.commitTransaction()
            session.endSession

            response.status(200).json({
                message: `Product Saved`,
                category: resp
            })
        } catch (error) {
            session.abortTransaction()
            session.endSession()

            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    },
    /**
     * 
     * We can pass category id as query param to get product by Category e.g category=5f2ae74e5c573128048f2fb1
     */
    getProducts : async (request, response)=>{
        try {
            const { category } = request.query 
            criteria = {}
            if(category){
                criteria.categories = category
            }
            console.log(criteria);
            const products = await Product.find(criteria || '').populate('categories')
            response.status(200).json({products})
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    },
     /**
     * 
     * get product By passing product id
     */
    getProductById : async(request, response)=>{
        try {
            const { id } = request.params
            const product = await Product.findById(id).populate('categories')
            response.status(200).json(product)
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    },
     /**
     * 
     * Update Product by passing product Id
     */
    updateProductById :async (request, response)=>{
        try {
            const { id } = request.params
            const body = request.body.product
            const product = await Product.updateOne({ _id: id }, { $set: body })
            response.status(200).json({ product})
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    },
    /**
     * 
     * Delete Product by passing product Id
     */
    deleteProductById :async (request, response)=>{
        try {
            const { id } = request.params
            
            const product = await Product.findByIdAndDelete(id)
            response.status(200).json(product)
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    }
}