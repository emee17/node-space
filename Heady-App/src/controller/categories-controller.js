const Category = require('../model/category-model')
const mongoose = require('mongoose')

module.exports = {
    /**
     * 
     * We can create catogry with its multiple nested catogries which can have further nested catogries
     * createCategory method is written in manner that if it found array of catogries then it will save All child catogries
     */
    createCategory: async (request, response) => {
        const session = await Category.startSession()
        session.startTransaction()
        try {
            const body = request.body

            var childCategories = await saveCategory(body.childCategories, mongoose, session)

            const category = await new Category({
                _id: new mongoose.Types.ObjectId,
                categoryName: body.categoryName,
                childCategories: childCategories
            })

            const resp = await category.save(session)

            await session.commitTransaction()
            session.endSession

            response.status(200).json({
                message: `Category Saved`,
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
     * Get All Categories 
     */
    getCategories: async (request, response) => {
        try {
            const categories = await Category.find().populate('childCategories')
            response.status(200).json({categories})
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    },
     /**
     * 
     * Get  Categoriy by Passing Id 
     */
    getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const category = await Category.findById(id).populate('childCategories')
            response.status(200).json({category})
        } catch (error) {
            response.status(500).json({
                message: `Internal Server Error`
            })
            throw new Error(error)
        }
    }
}

 /**
     * 
     * This method is used to find if there are child categories present in payload and it will save it 
     */
var saveCategory = async function (categories, mongoose, session) {
    
        var catogries1 = []

        for (let childCat of categories) {
            let catogries2 = []
            if (childCat.childCategories instanceof Array && childCat.childCategories.length > 0) {
                catogries2 = await saveCategory(childCat.childCategories, mongoose, session)
            }
            let category = await new Category({
                _id: new mongoose.Types.ObjectId,
                categoryName: childCat.categoryName,
                childCategories: catogries2
            })
            let cat = await category.save(session)
            await catogries1.push(cat)
        }
        return catogries1
}