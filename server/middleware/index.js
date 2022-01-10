/*
    This file serves as express middleware-- 
    it checks and verifies user tokens, and signs them if a user 
    logins in or registers. it also sets up cors along with other
    necessary middleware.
*/
const express = require('express');
require("dotenv").config();
const {JWT_SECRET} = process.env;
const jwt = require("jsonwebtoken");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const expressMiddleware = (app) =>{ 
    app.use(express.urlencoded({ extended: false }));

    //CORS for preventing xss attacks
    app.use(cors({
        origin: ["http://localhost:3000"],
        credentials: true
    }));
    app.options("*", cors());
    app.use(corsPolicy);
    //Express.json to return responses in the form of json objects
    app.use(express.json());

    //cookieParser for storing/retrieving jwts in cookies
    app.use(cookieParser());

    app.use(verify);
}

const corsPolicy = async (req, res, next) => {
	console.log(req.headers.origin);
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	next();
};

//verify() employs the principle of complete mediation: serves as auth middleware for every request
const verify = (req, res, next)=>{
    try {
        const token = req.cookies.token;
        //If there is no token (null), then return failure status
        if (!token) {
            console.log("make an account motherfucker");
        }
        else{
            const verified = jwt.verify(token, JWT_SECRET)
            req.userId = verified.userId; //Send on the user info in req
        }
    } 
    catch (err) {
        console.log("error occurred");
        return next();
    }
    next(); 
}
//signToken is used to create a json web token for the newly logged in or registered user
const signToken = (user)=>{
    return jwt.sign({
        userId: user._id
    }, JWT_SECRET);
}

module.exports = {expressMiddleware, signToken};