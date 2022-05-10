const { gql } = require('apollo-server');

const typeDefs = gql`
    input Pagination {
        page: Int!
        items: Int!
    }

    type User {
        id: Int!
        password: String
        email: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Post {
        id: Int
        title: String
        description: String!
    }

    type PostList {
        total: Int
        posts: [Post]
    }

    type Query {
        getPostsList(pagination: Pagination): PostList
    }

    type Mutation {
        registerUser(email: String!, password: String!): AuthPayload!
        login (email: String!, password: String!): AuthPayload!
    }
`

module.exports = typeDefs