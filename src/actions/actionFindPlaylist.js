import React from "react";
import playerSlice from "../store/slices/playerSlice";
import store from "../store/rootReducer/rootReducer";

const actionFindPlaylist = (playlist) => async dispatch => {
    await store.dispatch(playerSlice.actions.setPlaylist(playlist.tracks))
    await store.dispatch(playerSlice.actions.setTrack({trackNumber: 0}))
    await store.dispatch(playerSlice.actions.play())
}

export default actionFindPlaylist