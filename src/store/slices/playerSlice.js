import React from 'react'
import {createSlice} from "@reduxjs/toolkit";
import audio from "../../audio/audio";
import backendURL from "../../data/backEndURL";

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        isPlaying: false,
        isStopped: true,
        duration: 0,
        track: {},
        playlist: {},
        playlistIndex: 5,
        currentTime: 0,
        volume: 0.5,
    },
    reducers: {
        play(state, action) {
            // const audio1 = action.payload;
            audio.play();
            state.isPlaying = true;
            state.isStopped = false;
        },
        pause(state, action) {
            // const audio1 = action.payload;
            audio.pause();
            state.isStopped = false;
            state.isPlaying = false;
        },
        stop(state, action) {
            // const audio1 = action.payload;
            audio.pause();
            audio.currentTime = 0
            state.isPlaying = false;
            state.isStopped = true;
        },
        setOneTrack(state, action) {
            const {track} = action.payload;
            audio.src = backendURL + track.url;
            state.track = track;
            audio.play();
        },
        setTrack(state, action) {
            const {trackNumber} = action.payload;
            audio.src = backendURL + state.playlist[trackNumber].url
            // console.log(state.playlist[trackNumber].url)
            console.log(trackNumber)
            state.track = state.playlist[trackNumber];
            // state.playlist = playlist;
            state.playlistIndex = trackNumber
        },
        setDuration(state, duration) {
            state.duration = duration.payload;
        },
        nextTrack(state, action) {
            // const {nextIndex} = action.payload
            const nextIndex = state.playlistIndex + 1
            if (nextIndex < state.playlist.length){
                state.playlistIndex = nextIndex
                // const audio = action.payload
                audio.src = backendURL + state.playlist[nextIndex].url
                state.track = state.playlist[nextIndex]
                audio.play()
            } else {
                state.playlistIndex = 0
                // const audio = action.payload
                audio.src = backendURL + state.playlist[0]
                state.track = state.playlist[0]
            }
        },
        prevTrack(state, action){
            const prevIndex = state.playlistIndex - 1
            if(prevIndex >= 0){
                state.playlistIndex = prevIndex
                // const audio = action.payload
                audio.src = backendURL + state.playlist[prevIndex].url
                state.track = state.playlist[prevIndex]
                audio.play()
            } else {
                state.playlistIndex = state.playlist.length - 1
                // const audio = action.payload
                audio.src = backendURL + state.playlist[state.playlist.length - 1].url
                state.track = state.playlist[state.playlist.length - 1]
            }

        },
        setPlaylist(state, action){
            const playlist = action.payload
            state.playlist = playlist
        },
        setCurrentTime(state, action){
            if(action.payload !== audio.currentTime){
                if(state.isPlaying === true){
                    audio.currentTime = action.payload
                    audio.play()
                }
                audio.currentTime = action.payload
            }
            state.currentTime = action.payload
        },
        setVolume(state, action){
            // console.log(newVolume)
            audio.volume = action.payload
            state.volume = action.payload
        }
    },
});

export default playerSlice
