const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Making a User schema; information is firstName, lastName, email, username
//(used for verifying if entered pass and hashed pass are the same)
const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        email: { type: String, required: true },
        passwordHash: {type: String, required: true}
    },
    { timestamps: true },
);

/* When the User collection is made, mongoose automatically 
   makes the collection name lowercase and adds a "s" at the end.
  Hence, the collection name will be "users" */
module.exports = mongoose.model('User', UserSchema);