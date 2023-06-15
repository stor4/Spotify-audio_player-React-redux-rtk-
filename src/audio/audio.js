import React from "react";
import playerSlice from "../store/slices/playerSlice";
import store from "../store/rootReducer/rootReducer";


const audio = new Audio

audio.ontimeupdate = () => store.dispatch(playerSlice.actions.setCurrentTime(audio.currentTime))
audio.onended = () => store.dispatch(playerSlice.actions.nextTrack())
audio.onloadedmetadata = () => store.dispatch(playerSlice.actions.setDuration(audio.duration))

export default audio