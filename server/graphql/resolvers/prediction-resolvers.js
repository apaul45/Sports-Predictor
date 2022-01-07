/*
    Resolvers are where all the typedef functions are defined:
    this is where requests are made to the database in order to define and
    send back custom responses to the front end
*/
const Prediction = require("../../models/prediction-model");

// Resolvers have 3 different types of arguments: 
// the 1st argument is the parent field, which can
// be used to link different types together or retrieve and use
// a specific type. The

// the 2nd argument is args, which is an object containing all the
// parameters defined in the typedefs 

// the 3rd argument is context, which contains useful authentication
// data (in this case, data passed from the auth middleware to context)
const predictionResolvers = {
    Query: { 
        getPredictionById : async(_, {id})=>{
            try{
                const prediction = await Prediction.findById({_id: id});
                return prediction;
            }
            catch(err){ 
                return "Prediction retrieval failed."
            }
        },
        getPredictionByFilter: async(_, {filter})=>{
            try{

                const filteredPredictions = await Predictions.find({stats:{name: filter}});
                return filteredPredictions;
            }
            catch(err){ 
                return "Filter was unsuccessful.";
            }
        },
        getAllPredictions: async() => {
            try{
                const lists = await Prediction.find({});
                return lists;
            }
            catch(err){
                return "Retrieval of all predictions failed."
            }
        }
    },
    
    Mutation: { 
        createPrediction: async(_, {prediction}) =>{
            try{
                const newPrediction = new Prediction(prediction);
                await newPrediction.save();
            }
            catch(err){ 
                return "Prediction not successfully created."
            }
        },
        updatePrediction: async(_, {prediction}) => {
            // Going to use the findOneandUpdate commadrather than the updateOne 
            // command to update this prediction as it returns the updated prediction
            try{
                const id = prediction._id;
                const updatedPrediction = await Prediction.findOneAndUpdate({id},{prediction});
                return updatedPrediction;
            }
            catch(err){
                return "Prediction was not successfully updated."
            }
        },
        deletePrediction: async(_, {id})=>{
            try{
                await Prediction.findOneAndDelete({_id: id});
                return "Prediction was successfully deleted."
            }
            catch(err){
                return "Prediction not able to be deleted"
            }
        }
    }
}

module.exports = predictionResolvers;