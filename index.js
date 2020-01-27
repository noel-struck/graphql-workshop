const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');

// Call environment variables
require('dotenv').config()

// SERVER SETUP
function startServer() {
    const app = express();
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Server listening at port: ${PORT}`);
    });
}

startServer();