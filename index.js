const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');

// Call environment variables
require('dotenv').config()

// SERVER SETUP
function startServer() {
    const app = express();
    const PORT = process.env.PORT;
    console.log(PORT);

    // Dummy Data
    const categoryData = [
        {
            _id: 1,
            name: 'Men'
        },
        {
            _id: 2,
            name: 'Women'
        },
        {
            _id: 3,
            name: 'Kids'
        }
    ];

    // Type Definitions
    const typeDefs = gql`
        type Category {
            _id: ID,
            name: String!
        }

        type Query {
            categories: [Category]
            category(_id: Int): Category
        }

        input CategoryInput {
            name: String!
        }

        type Mutation {
            createCategory(category: CategoryInput!): Category
            updateCategory(_id: Int!, category: CategoryInput): Category
            deleteCategory(_id: Int!): [Category]
        }
    `;

    // Resolvers
    const resolvers = {
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
                const index = categoryData.find(item => item._id === args._id);
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
    }

    // Crear una instancia de Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({app});
    app.listen(PORT, () => {
        console.log(`Server listening at port: http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();