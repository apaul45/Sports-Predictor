/* 
    After connecting to the mongoDB database via mongoose.connect, 
    a collection is made in this database whenever a model is defined
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    Predictions contain 4 things:
    1. Their mongoDb generated id
    2. The username of the user who made this prediction
    3. The actual stats of the prediction 
    4. The factors selected by the user in the radio form--the ones used in the graph
*/
const PredictionSchema = new Schema(
    {
        username: {type: String, required: true},
        stats: {type: Object, required: true},
        radioFactors: {type: Object, required:true},
    },
    { timestamps: true },
)

/* When the Prediction collection is made, mongoose automatically 
   makes the collection name lowercase and adds a "s" at the end.
   Hence, the collection name will be "predictions" */
module.exports = mongoose.model('Prediction', PredictionSchema);