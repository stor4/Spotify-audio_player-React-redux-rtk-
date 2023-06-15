import React from "react";
import api from "../store/api/api";
import actionFullLogin from "./actionFullLogin/actionFullLogin";

const actionFullSignUp = (login, password) =>
    async dispatch => {
        try {
            const result = await dispatch(api.endpoints.createUser.initiate({login, password}))
            console.log(result)
            if (result?.data?.createUser?._id){
                await dispatch(actionFullLogin(login, password))
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    export default actionFullSignUp