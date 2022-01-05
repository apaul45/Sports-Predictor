const User = require('../../models/user-model');
const auth = require("../../middleware/auth");
const bcrypt = require('bcryptjs');

// Resolvers have 3 different types of arguments: 
// the 1st argument is the parent field, which can
// be used to link different types together or retrieve and use
// a specific type. The

// the 2nd argument is args, which is an object containing all the
// parameters defined in the typedefs 

// the 3rd argument is context, which contains useful authentication
// data (in this case, data passed from the auth middleware to context)
const userResolvers = { 

    Query:{
        // Since the auth middleware checks for a and returns a 
        // user id, the parent and args fields aren't needed here. 
        // Only req is needed so the context field can be destructured to {req}
        getUser: async(_, _, {req})=>{
            const user = await User.findOne(req.userId);
            if (user) return user;
        }
    },

    Mutation: {
        // Since registerUser has to validate and generate a token for the newly
        // created user, registerUser needs the inputted fields by the user which
        // is in args, and req is needed to store that token in a cookie
        registerUser: (_, args, {res}) => { 
            try {
                const {email, username, password, passwordVerify } = args;
                if (!email || !username || !password || !passwordVerify) {
                    return "Please enter all required fields.";
                }
                //Check if the username only contains alphanumeric characters
                let regex = /^[A-Za-z0-9]+$/;
                if(!regex.test(username)){
                    return "Please enter all required fields.";
                }
                if (password.length < 8) {
                    return "Please enter a password of at least 8 characters.";
                }
                if (password !== passwordVerify) {
                    return "Please enter the same password twice.";

                }

                //Check if a user with this email exists
                let existingUser = await User.findOne({ email: email });
                if (existingUser) return "An account with this email already exists"

                //Also check if this username exists
                existingUser = await User.findOne({username: username});
                if (existingUser) return "An account with this username already exists.";
                
                //saltRounds indicate the total number of different salts there are
                //salts are random values that get appended to the end of a hashed password to ensure randomness:
                //makes it harder for hackers to crack hashed passes using lookup tables and etc
                const saltRounds = 10;
                //generates the respective salt from the "pool" of salts
                const salt = await bcrypt.genSalt(saltRounds);
                //bcrypt, whih uses the Blowfish algorithm, hahses the registered pass w/ the generated salt val
                const passwordHash = await bcrypt.hash(password, salt);
                //Then a new user is created using the entered first & last names, email, and password
                const newUser = new User({
                    username, email, passwordHash
                });
                const savedUser = await newUser.save();
        
                // LOGIN THE USER
                const token = auth.signToken(savedUser);
        
                //Save generated jwt in a cookie
                res.cookie("token", token, { httpOnly: true });

                return newUser;
            } catch (err) {
                return "Register not successful. Please try again.";
            }
        },

        loginUser: (_, args, {res})=>{
            try{
                const{username, password} = args;
                //Check if the username the user entered exists in the current database
                const existingUser = await User.findOne({ username: username });
                if (!existingUser) {
                    return "Wrong username or password.";
                }
                //Use bcrypt to check if the entered password matches the hashed one
                const correctPass = await bcrypt.compare(password, existingUser.passwordHash);
                if (!correctPass){
                    return "Wrong email or password.";
                }
                //Log the user in by signing a jwt web token
                const token = auth.signToken(existingUser);

                //Save generated jwt in a cookie
                res.cookie("token", token, { httpOnly: true });
            } 
            catch(err){
                return "Login not successful. Please try again.";
            }
        },

        //Since logoutUser only clears the cookie containing the user token, 
        //only res is needed as that is where the cookie is located
        logoutUser: (_, _, {res})=> {
            try{
                res.clearCookie("token");
                return true;
            }
            catch(err){
                return false;
            }
        }
    }
}

module.exports = userResolvers;