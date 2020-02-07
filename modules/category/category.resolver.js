const categoryModel = require('./category.model');
const categoryProduct = require('../product/product.model');

const categoryResolvers = {
    Query: {
        categories: async (parent, args) => {
            return await categoryModel.find();
        },
        category: async (parent, args) => {
            return await categoryModel.findById(args._id);
        }
    },
    Mutation: {
        createCategory: async (parent, args) => {
            const categoryInstance = new categoryModel(args.category);
            return await categoryInstance.save();
        },
        updateCategory: async (parent, args) => {
            return await categoryModel.findByIdAndUpdate(args._id, args.category, { new: true }); 
        },
        deleteCategory: async (parent, args) => {
            await categoryModel.findByIdAndDelete(args._id);
            return await categoryModel.find();
        }
    }
};

module.exports = categoryResolvers;