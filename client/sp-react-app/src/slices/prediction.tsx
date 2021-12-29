/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.
*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Player from '../classes/player-model';

interface PredictionState{ 
    data: Array<Player>, 
    errorMessage: string,
}
const initialState:PredictionState = {data: [], errorMessage: ""};

export const predictionSlice = createSlice({
    name: "predictions-data",
    initialState: initialState,
    reducers: {
        setPredictions: (state, action: PayloadAction<PredictionState>) => {
            state = action.payload;
        },
        addPrediction: (state, action:PayloadAction<Player>) => {
            state.data = [...state.data, action.payload];
        },
        setError: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    }
});

//Export the actions so they can be used by useDispatch
export const {setPredictions, addPrediction, setError} = predictionSlice.actions;

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default predictionSlice.reducer;