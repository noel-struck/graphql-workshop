const categoryModel = require('./category.model');
const categoryProduct = require('../product/product.model');

const categoryResolvers = {
    Query: {
        categories: async (parent, args) => {
            return await categoryModel.find();
        },
        category: async (parent, args) => {
            return await categoryModel.findById(args.id);
        }
    },
    Mutation: {
        createCategory: async (parent, args) => {
            const categoryInstance = new categoryModel(args.category);
            return await categoryInstance.save();
        },
        updateCategory: (parent, args) => {

        },
        deleteCategory: (parent, args) => {

        }
    }
};

module.exports = categoryResolvers;