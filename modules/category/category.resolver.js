const categoryModel = require('./category.model');
const productModel = require('../product/product.model');

const categoryResolvers = {
    Category: {
        products: (parent, args) => {
            return productModel.find({ category: parent._id});
        }
    },
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