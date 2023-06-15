import React from "react";
import store from "../store/rootReducer/rootReducer";
import api from "../store/api/api";

const uploadAvatar = async (file) => {
    let fd = new FormData
    fd.append('photo', file)
    console.log([...fd.entries()])

    const response = await fetch('http://player.node.ed.asmer.org.ua/upload', {
        method: "POST",
        headers: store.getState().auth.token ? {Authorization: 'Bearer ' + store.getState().auth.token} : {},
        body: fd
    })
    return response.json()
}

const actionUploadAvatar = (ava, userId) =>
    async dispatch => {
        const result = await uploadAvatar(ava)
        console.log(result)
        await dispatch(api.endpoints.setAvatar.initiate( {user: {_id: userId, avatar: {_id: result._id}}}))
    }

export default  actionUploadAvatar