/*
    This file is where all server (Express for HTTP requests, 
    Apollo for graphQl) configuration is done
*/
import express from 'express';

/*
    apollo-server-express can be used instead of apollo-server in order 
    to use graphql while still having the flexibility to also use 
    a REST API. apollo-server-express makes it so that a graphql
    server can be used WITHIN EXPRESS

    Article: https://www.apollographql.com/blog/backend/using-express-with-graphql-server-node-js/

    Using an Apollo server for graphQl allows for data to be easily 
    transferred between the front end and backend-- Apollo is designed
    to handle graphQl on either side
*/
import { ApolloServer, gql } from 'apollo-server-express';

/*
    dotenv is used to load environment variables (ie, the site's 
    secret password  for user auth, the port number, etc) from 
    a .env file into process.env

    Install dotenv using the npm i dotenv command
*/
require("dotenv").config;
const {PORT, DB_CONNECT} = process.env;


const app = express();

//Line below is used to make Express serve json files (ie, for responses to send to front end)
app.use(express.json());

app.listen(PORT, () => {
    console.log("Express server running on port " + PORT);
});
