import React from "react";
import api from "../../store/api/api";
import authSlice from "../../store/slices/authSlice";

const actionFullLogin = (login, password) =>
    async dispatch => {
        const token = await dispatch(api.endpoints.login.initiate({login, password}))
        console.log(token)
        if (token?.data?.login){
            dispatch(authSlice.actions.login(token.data.login))
        }
        // await dispatch(api.endpoints.getCategoryById.initiate({_id: Math.random()}))
    }

export default actionFullLogin