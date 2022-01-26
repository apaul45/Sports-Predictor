/*
  In order to have separate typedef files for the user and 
  prediction, extend has to be added to the Query and Mutation types in these 
  typedef

  See this article for more information: https://mernapps.com/seperate-typedefs-and-resolvers-in-to-files-graphql-apollo-server/
*/
const {gql} = require("apollo-server-express")

//Exclamation points next to types indicate that the field isn't nullable
//A union type can be used to allow for a resolver to have multiple return types

//In order to use make Prediction both an input and output type, the simplest way is
//to define its type as a liteal expression, and then define a type and input type using this
//Source: https://stackoverflow.com/questions/41515679/can-you-make-a-graphql-type-both-an-input-and-output-type
const FactorType = `
    health: String!, 
    player_role: String!, 
    fadrft: String!,
`;
const StatsType = `
    ppg: Float!, 
    rpg: Float!, 
    apg: Float!, 
    spg: Float!, 
    bpg: Float!, 
    team: String!,
    gp: String!,
    name: String!,
    age: String!, 
`;
const predictionDefs = gql`
    type Stats{
        ${StatsType}
    }
    input StatInput{
        ${StatsType}
    }
    type Factors{ 
        ${FactorType}
    }
    input FactorInput{
        ${FactorType}
    }
    type Prediction{
        _id: ID, 
        username:String,
        stats: Stats,
        radioFactors: Factors
    },
    input UserPrediction{
        username:String,
        stats: StatInput,
        radioFactors: FactorInput
    }

    extend type Query{
        getPredictionById(id: String): Prediction, 
        getPredictionByFilter(filter: String!): Prediction, 
        getAllPredictions: [Prediction],
    }

    extend type Mutation{
        createPrediction(prediction: UserPrediction!): Prediction,
        updatePrediction(prediction: UserPrediction!): Prediction, 
        deletePrediction(id: String!): Prediction
    }
`;

module.exports = predictionDefs;

