/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.
*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PredictionState{ 
    data: Array<any>
}
const initialState:PredictionState = {data: []};

export const predictionSlice = createSlice({
    name: "predictions-data",
    initialState: initialState,
    reducers: {
        setPredictions: (state, action: PayloadAction<PredictionState>) => {
            state = action.payload;
        },
        addPrediction: (state, action:PayloadAction<any>) => {
            state.data = [...state.data, action.payload];
        }
    }
});

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default predictionSlice.reducer;