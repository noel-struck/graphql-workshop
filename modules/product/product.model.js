const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: String,
    description: String,
    sizes: [String],
    price: Number,
    inventory: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = model('Product', productSchema);