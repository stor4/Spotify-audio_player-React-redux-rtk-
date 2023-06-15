import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const jwtDecode = token => {
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch(e){}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, payload: null},
    reducers: {
        login(state, {payload:token}){
            console.log('LOGIN', state, token)
            const payload = jwtDecode(token)
            if (payload){
                state.payload = payload
                state.token   = token
            }
            // return {payload, token}
        },
        logout(state){
            // console.log('LOGOUT', state)
            state.payload = null
            state.token   = null
        }
    }
})

export default authSlice