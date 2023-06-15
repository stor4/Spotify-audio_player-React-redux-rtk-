import React from "react";
import authSlice from "../../store/slices/authSlice";

const actionLogout = () =>
    async dispatch => {
        dispatch(authSlice.actions.logout())
    }

export default actionLogout