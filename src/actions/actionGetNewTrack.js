import React from "react";
import api from "../store/api/api";

const actionGetNewTrack = (_id) =>
    async dispatch => {
        const result = await dispatch(api.endpoints.trackFind.initiate({_id: _id}))
        console.log(result)
        return result.data.TrackFind[0]
    }

export default actionGetNewTrack