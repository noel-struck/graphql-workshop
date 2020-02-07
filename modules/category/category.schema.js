const { gql } = require('apollo-server-express');

const categorySchema = gql `
    type Category {
        _id: ID,
        name: String!
        products: [Product]
    }

    extend type Query {
        categories: [Category]
        category(_id: String!): Category
    }

    input CategoryInput {
        name: String!
    }

    extend type Mutation {
        createCategory(category: CategoryInput!): Category
        updateCategory(_id: String!, category: CategoryInput): Category
        deleteCategory(_id: String!): [Category]
    }
`;

module.exports = categorySchema;
