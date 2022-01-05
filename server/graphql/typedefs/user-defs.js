/*
  In order to have separate typedef files for the user and 
  prediction, extend has to be added to the Query and Mutation types in these 
  typedef

  See this article for more information: https://mernapps.com/seperate-typedefs-and-resolvers-in-to-files-graphql-apollo-server/
*/
const {gql} = require("apollo-server-express");

//Exclamation points next to types indicate that the field isn't nullable
//A union type can be used to allow for a resolver to have multiple return types
const userDefs = gql`
    type User{
        _id: ID, 
        username: String, 
        email: String, 
        passwordHash: String
    }
    type ErrorMessage{
        message: String, 
    },

    union ReturnValue = User | ErrorMessage, 

    extend type Query{
        getUser(filter:String!): ReturnValue!
    }

    extend type Mutation{
        registerUser(email: String!, username: String!, password: String!, passwordVerify: String!): ReturnValue!,
        loginUser(username:String!, password: String!): ReturnValue!, 
        logoutUser: Boolean!
    }
`;

module.exports = {typedefs: userDefs};