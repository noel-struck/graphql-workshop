const { gql } = require('apollo-server-express');

const productSchema = gql`
    type Product {
        _id: ID
        title: String
        description: String
        sizes: [String]
        price: Float
        inventory: Int
        category: Category
    }

    input ProductInput {
        title: String
        description: String
        sizes: [String]
        price: Float
        inventory: Int
        category: String
    }

    extend type Query {
        products: [Product]
        product (_id: String!): Product 
    }

    extend type Mutation {
        createProduct(product: ProductInput!): Product
        updateProduct(_id: String, product: ProductInput): Product
        deleteProduct(_id: String): [Product]
    }
`;

module.exports = productSchema;