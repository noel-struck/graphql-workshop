const { gql } = require('apollo-server-express');

const categorySchema = gql `
    type Category {
        _id: ID,
        name: String!
    }

    extend type Query {
        categories: [Category]
        category(_id: Int): Category
    }

    input CategoryInput {
        name: String!
    }

    extend type Mutation {
        createCategory(category: CategoryInput!): Category
        updateCategory(_id: Int!, category: CategoryInput): Category
        deleteCategory(_id: Int!): [Category]
    }
`;

module.exports = categorySchema;
