const productModel = require('./product.model');

const resolver = {
  Query: {
    products: async (parent, args) => {
        return await productModel.find().populate('category');
    },
    product: async (parent, args) => {
        return await productModel.findById(args._id).populate('category');
    }
  },
  Mutation: {
    createProduct: async (parent, args) => {
      const productInstance = new productModel(args.product);
          const productCreated = await productInstance.save();
          return productModel
              .findById(productCreated._id)
              .populate('category');
    },
    updateProduct: async (parent, args) => {
      const productUpdated = await productModel.findByIdAndUpdate(args._id, args.product, { new: true });
      return await productModel.findById(productUpdated._id).populate('category');
    },
    deleteProduct: async (parent, args) => {
      await productModel.findByIdAndDelete(args._id);
      return productModel.find().populate('category');
    }
  }
}

module.exports = resolver;