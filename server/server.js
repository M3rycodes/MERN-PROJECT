const express = require('express');
const {ApolloServer } = require('apollo-server-express');
const path = require('path');
const {typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const {authMiddleware} = require('./utils/auth');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

// Apply Express middleware to handle GraphQL requests
server.applyMiddleware({ app });

// Connect to the database
db.once('open', () => {
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
});