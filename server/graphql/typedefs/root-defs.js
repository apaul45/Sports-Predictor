const {gql} = require("apollo-server-express");
const userDef = require("./user-defs").typeDefs;
const predictionDef = require('./predictions-def').typeDefs;

/*
    In addition to extending the query and mutation types in the
    individual type def files, a root def with _empty types must
    also be defined. The individual type defs can then be exported
    in this file 

    See this website for more information: https://mernapps.com/seperate-typedefs-and-resolvers-in-to-files-graphql-apollo-server/
*/

const rootDef = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = {
	typeDefs: [rootDef, userDef, predictionDef],
};  
