import React from "react";
import playerSlice from "../store/slices/playerSlice";

const actionFindTrack = (data, index) =>
    async dispatch => {
        await dispatch(playerSlice.actions.setPlaylist(data.TrackFind))
        await dispatch(playerSlice.actions.setTrack({trackNumber: index}))
        await dispatch(playerSlice.actions.play())
    }

export default actionFindTrack