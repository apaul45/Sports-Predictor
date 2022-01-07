/*
  In order to have separate typedef files for the user and 
  prediction, extend has to be added to the Query and Mutation types in these 
  typedef

  See this article for more information: https://mernapps.com/seperate-typedefs-and-resolvers-in-to-files-graphql-apollo-server/
*/
const {gql} = require("apollo-server-express")

//Exclamation points next to types indicate that the field isn't nullable
//A union type can be used to allow for a resolver to have multiple return types

const predictionDefs = gql`
    type Prediction{
        _id: ID, 
        username:String,
        stats: Object,
        radioFactors: Object
    },

    type ErrorMessage{
        message: String, 
    },

    union ReturnValue = Prediction | ErrorMessage, 

    extend type Query{
        getPredictionById(id: String): ReturnValue!, 
        getPredictionByFilter(filter:Object): [ReturnValue], 
        getAllPredictions: [ReturnValue!],
    }

    extend type Mutation{
        createPrediction(prediction: Prediction!): ReturnValue!,
        updatePrediction(prediction:Prediction!): ReturnValue!, 
        deletePrediction(id: String!): String!
    }
`;

module.exports = {typedefs: predictionDefs};

