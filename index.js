const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');

// SERVER SETUP
function startServer() {
    const app = express();
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server listening at port: ${PORT}`);
    });
}

startServer();