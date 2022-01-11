/*
    This file handles making all requests to the back end, to be used by 
    the slices in redux as well as any components in the app
*/
import { GraphQLClient } from 'graphql-request';

const endpoint = "http://localhost:4000/graphql";

//This graphql client instance will be used to send requests
const client = new GraphQLClient(endpoint, { headers: {} })

export let data:any = [];

export const executeRequest = async(request: string, variables: any) => {
    const info = await client.request(request, variables);
    setData(info);
};

export const setData = (payload:any)=> {
    data = payload;
}
