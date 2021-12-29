/*
    Redux toolkit simplifies the creation of different reducers 
    with the use of createSlice. This allows for easily defining different reducers
    in the store by defining each reducer under a slice. This allows for seeing how 
    the reducer works wih the initialState and how it uses an action's payload to update
    data.
*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        //The action payload must be specified as PayloadAction<type>
        login: (state, action: PayloadAction<string>) => {
            state.value.username = action.payload;
        },
        register: (state, action: PayloadAction<AuthState>)=> {
            state = action.payload;
        },
        logout: (state) =>{
            state.value = initialState.value;
        }
    }
});

/* In order to update state variables in this slice, the actions
(ie, login, register, and logout) also have to be exported so they can
be used when appropriate */
export const {login, register, logout} = authSlice.actions;

//Since authSlice is NOT a reducer BUT a slice, also have to export authSlice.reducer
export default authSlice.reducer;