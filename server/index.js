/*
    This file is where all server (Express for HTTP requests, 
    Apollo for graphQl) configuration is done

    graphQL serves as a additional layer between the front end and back end--
    this allows for use of design patterns such as adapter to make it easier to
    integrate different databases into the project as needed without affecting
    the front end. 
*/

/*
    The 3 imports below are all node.js apis
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const typeDefs = require("../server/graphql/typedefs/root-defs");
const resolvers = require("../server/graphql/resolvers/root-resolvers");

//Mongoose = ODM used w/ mongoDB 
const mongoose = require('mongoose');

//Authentication middleware
const {verify, signToken} = require("./middleware/auth");

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
const { ApolloServer } = require('apollo-server-express');

/*
    dotenv is used to load environment variables (ie, the site's 
    secret password  for user auth, the port number, etc) from 
    a .env file into process.env

    Install dotenv using the npm i dotenv command
*/
/*
    DB_CONNECT is the url of the mongoDB database that mongoose will connect to. 
    It is in the form of mongodb://127.0.0.1:27017/ + database_name
*/
const {PORT, DB_CONNECT} = process.env;

const app = express();

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: false }));

//CORS for preventing xss attacks
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

const corsPolicy = async (req, res, next) => {
	console.log(req.headers.origin);
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	next();
};
app.options("*", cors());
app.use(corsPolicy);
//Express.json to return responses in the form of json objects
app.use(express.json());

//cookieParser for storing/retrieving jwts in cookies
app.use(cookieParser());

app.use(verify);
const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	context: ({ req, res }) => ({ req, res }),
    uploads: false,
});

// In the newer version of apollo-server-express, the following setup is necessary 
// to get the graphql server up and running
//Docs: https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express
const start = async(app, server) => { 
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
start(app, server);

mongoose
    .connect(DB_CONNECT, { useNewUrlParser: true })
    .then(console.log("mongoose connected"))
    .catch(e => {
        console.error('Connection error', e.message)
    });
