const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { ApolloServer } = require('@apollo/server')
// const { expressMiddleware } = require('@apollo/server/express4')
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const http = require('http')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const User = require('./Models/User')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI

  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})