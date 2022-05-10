const { ApolloServer } = require('apollo-server')
const jwt =  require('jsonwebtoken')
const typeDefs = require('./src/schema/schema')
const resolvers = require('./src/resolvers/resolver')

require('dotenv').config()

const { JWT_SECRET, PORT } = process.env

const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, JWT_SECRET)
        } else {
            return null
        }
    } catch (error) {
        console.log(error.message);
        return null
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.get('Authorization') || ''
        return { auth: getUser(token.split(' ')[1])}
    },
    introspection: true,
    playground: true
})

server.listen({ port: PORT || 8080 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });