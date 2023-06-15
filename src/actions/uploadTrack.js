import React from "react";
import store from "../store/rootReducer/rootReducer";

const uploadTrack = async (file) => {
    let fd = new FormData
    fd.append('track', file)
    console.log([...fd.entries()])

    let result

    await fetch('http://player.node.ed.asmer.org.ua/track', {
        method: "POST",
        headers: store.getState().auth.token ? {Authorization: 'Bearer ' + store.getState().auth.token} : {},
        body: fd
    }).then((res)=>console.log(res.json()))
}

export default uploadTrack()