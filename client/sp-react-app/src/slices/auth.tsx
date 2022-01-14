/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.
*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
require('fetch-cookie/node-fetch')(require('node-fetch'));

const endpoint = "http://localhost:4000/graphql";

//This graphql client instance will be used to send requests
//This graphql client instance will be used to send requests
const client = new GraphQLClient(endpoint, { headers: { 
    authentication: "Bearer token",
  }});

const initialState = {username: ""};

export const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        //The action payload must be specified as PayloadAction<type>
        login: (state, action: PayloadAction<any>) => {
            state.username = action.payload.loginUser.username;
        },
        register: (state, action: PayloadAction<any>)=> {
            state.username = action.payload.registerUser.username;
        },
        logout: (state, action: PayloadAction<any>) =>{
            state=initialState;
        }
    }
});

/* In order to update state variables in this slice, the actions
(ie, login, register, and logout) also have to be exported so they can
be used when appropriate */
export const {login, register, logout} = authSlice.actions;

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default authSlice.reducer;

//The function below will serve as an async thunk (ie, middleware that fetches data from back end)
//Type is the action itself, so that it can be called after the appropriate data is fetched
export function fetchUsers(type: any, request: string, variables: any){
    return async (dispatch:any) => {
        const response = await client.request(request, variables);
        console.log(response);
        dispatch(type(response));
    }
}