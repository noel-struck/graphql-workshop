const express = require('express');
const mongoose = require('mongoose');
const { gql, ApolloServer } = require('apollo-server-express');
// CATEGORY 
const categorySchema = require('./modules/category/category.schema');
const categoryResolver = require('./modules/category/category.resolver');
// PRODUCT
const productSchema = require('./modules/product/product.schema');
const productResolver = require('./modules/product/product.resolver');

// Call environment variables
require('dotenv').config()

// SERVER SETUP
async function startServer() {
    const app = express();
    const PORT = process.env.PORT;

    await mongoose.connect(process.env.DB_STRING, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useFindAndModify: false });

    // Type Definitions
    const typeDefs = gql`
        type Query
        type Mutation
    `;

    // Crear una instancia de Apollo Server
    const server = new ApolloServer({ 
        typeDefs: [typeDefs, categorySchema, productSchema], 
        resolvers: [categoryResolver, productResolver] 
    });

    server.applyMiddleware({app});
    app.listen(PORT, () => {
        console.log(`Server listening at port: http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();