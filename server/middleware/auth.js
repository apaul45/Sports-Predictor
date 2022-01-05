/*
    This file serves as middleware for user authentication-- 
    it checks and verifies user tokens, and signs them if a user 
    logins in or registers
*/
require("dotenv").config();
const {JWT_SECRET} = process.env;
const jwt = require("jsonwebtoken");

//verify() employs the principle of complete mediation: serves as auth middleware for every request
const verify = (req, res, next)=>{
    try {
        const token = req.cookies.token;
        //If there is no token (null), then return failure status
        if (!token) {
            return res.status(401).json({
                username: null
            })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = verified.userId; //Send on the user info in req
    } 
    catch (err) {
        console.error(err);
        return res.status(401).json({
            username: null
        });
    }
    next(); 
}

//signToken is used to create a json web token for the newly logged in or registered user
const signToken = (user)=>{
    return jwt.sign({
        userId: user._id
    }, JWT_SECRET);
}

module.exports = {verify, signToken};