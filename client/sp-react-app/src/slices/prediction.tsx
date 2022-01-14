/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.

    The prediction slice will also handle updating the database with the use of the graphql request library and async thunks

    https://github.com/prisma-labs/graphql-request
    https://blog.devgenius.io/async-api-fetching-with-redux-toolkit-2020-8623ff9da267
*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
require('fetch-cookie/node-fetch')(require('node-fetch'));


const endpoint = "http://localhost:4000/graphql";

//This graphql client instance will be used to send requests
const client = new GraphQLClient(endpoint, { headers: { 
    authorization: "Bearer token",
  }});


interface PredictionState{ 
    data: any, 
    errorMessage: string,
}

const initialState:PredictionState = {data: [], errorMessage: ""};

export const predictionSlice = createSlice({
    name: "predictions-data",
    initialState: initialState,
    reducers: {
        setPredictions: (state, action:PayloadAction<any>) => {
            state.data = action.payload.getAllPredictions;
            console.log(state.data);
        },
        addPrediction: (state, action:PayloadAction<any>) => {
            //As executeRequest returns a Promise object, .then must be used to retrieve the payload
            console.log("prediction being added");
            state.data.push(action.payload.createPrediction);
            console.log(state.data);            
        },
        deletePrediction: (state, action:PayloadAction<any>) => {
            state.data = state.data.filter((prediction: any) => 
                         prediction._id !== action.payload.deletePrediction._id);
        },
        updatePrediction: (state, action:PayloadAction<any>) => {
            state.data = action.payload.getAllPredictions; 
        },
        setError: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    }
});

//Export the actions so they can be used by useDispatch
export const {setPredictions, addPrediction, setError, deletePrediction} = predictionSlice.actions;

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default predictionSlice.reducer;

//The function below will serve as an async thunk (ie, middleware that fetches data from back end)
//Type is the action itself, so that it can be called after the appropriate data is fetched
export function fetchPredictions(type: any, request: string, variables: any){
    return async (dispatch:any) => {
        const response = await client.request(request, variables);
        console.log(response);
        dispatch(type(response));
    }
}