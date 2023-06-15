import React from "react";
import store from "../../store/rootReducer/rootReducer";
import api from "../../store/api/api";

const actionAboutMe = () =>
    async dispatch => {
        const user = store.getState().auth.payload?.sub?.id
        const result = await dispatch(api.endpoints.userInfo.initiate({_id: {_id: user}}))
        console.log(result.data)
        return result.data
    }

export default actionAboutMe()