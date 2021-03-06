/*
    This file contains all the queries to be made on the client side of the app. 
    To use a query in a component, the query must be imported in this file and 
    then specified as a parameter to the request function from the graphql request
    library
*/
import {gql} from 'graphql-request';

/*
    For a field with multiple output types (ie, field has a union return type),
    the data to be used from each type can be defined using the following syntax:

    __typename
    ... on (One return type){
        (fields in this return type)
    }
    .. on (Another return type){
        (fields in this return type)
    }

    Documentation: https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
*/
export const GET_USER = gql`
    query getCurrentUser{
        getUser{
            username
        }
    }
`;

export const GET_PREDICTION_ID = gql`
    query getPredictionById($id: ID){
        getPredictionById(id: $id){
            _id, 
            username,
            stats{
                ppg,
                rpg, 
                apg, 
                bpg, 
                spg, 
                name, 
                team
            }
        }
    }
`;

export const GET_PREDICTION_FILTER = gql`
    query getPredictionByFilter($filter: String){
        getPredictionById(filter: $filter){
            _id, 
            username,
            stats{
                ppg,
                rpg, 
                apg, 
                bpg, 
                spg, 
                name, 
                team
            }
        }
    }
`;

export const GET_ALL_PREDICTIONS = gql`
    query getAllPredictions{ 
        getAllPredictions{
            _id, 
            username,
            stats{
                ppg,
                rpg, 
                apg, 
                bpg, 
                spg, 
                name, 
                team
            }
        }
    }
`;



