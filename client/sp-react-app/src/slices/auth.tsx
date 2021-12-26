/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.
*/

import {createSlice} from '@reduxjs/toolkit';

interface AuthState{
    value: {
        username: string;
        passwordHash: string;
        email: string;
    }
}
const initialState: AuthState = {value: {username: "apaul421", passwordHash: "dsfaefdq2w213413", 
                                email: "apaul"}};

export const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        register: (state, action)=> {
            state.value = action.payload;
        },
        logout: (state) =>{
            state = initialState;
        }
    }
});

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default authSlice.reducer;