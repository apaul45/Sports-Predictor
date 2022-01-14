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

const corsPolicy = async (req, res, next) => {
	console.log(req.headers.origin);
    res.set("Access-Control-Allow-Credentials", true);
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	next();
};

const expressMiddleware = (app, corsOptions) =>{ 
    //cookieParser for storing/retrieving jwts in cookies
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));

    //CORS for preventing xss attacks
    app.use(cors(corsOptions));
    app.use(corsPolicy);
    //Express.json to return responses in the form of json objects
    app.use(express.json());
    app.use(verify);
}

//verify() employs the principle of complete mediation: serves as auth middleware for every request
const verify = (req, res, next)=>{
    try {
        const token = req.cookies["token"];
        //If there is no token (null), then return failure status
        if (!token) {
            console.log("make an account motherfucker");
        }
        else{
            console.log("shits working?");
            const verified = jwt.verify(token, JWT_SECRET);
            req.userId = verified.userId; //Send on the user info in req
            console.log(req.userId);
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