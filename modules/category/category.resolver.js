const categoryData = require('./category.data');

const categoryResolvers = {
    Query: {
        categories: (parent, args) => {
            return categoryData;
        },
        category: (parent, args) => {
            return categoryData.find(item => item._id === args._id);
        }
    },
    Mutation: {
        createCategory: (parent, args) => {
            const listOfCategoriesIds = categoryData.map(category => category._id);
            const maxCategoryId = Math.max(...listOfCategoriesIds);
            args.category._id = maxCategoryId + 1;
            categoryData.push(args.category);
            return args.category;
        },
        updateCategory: (parent, args) => {
            const index = categoryData.findIndex(item => item._id === args._id);
            categoryData[index] = args.category;
            categoryData[index]._id = args._id;
            return categoryData[index];
        },
        deleteCategory: (parent, args) => {
            const index = categoryData.findIndex(item => item._id === args._id);
            const deleted = categoryData.splice(index, 1);
            return categoryData;
        }
    }
};

module.exports = categoryResolvers;