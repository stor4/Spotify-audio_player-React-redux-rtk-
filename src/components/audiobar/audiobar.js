import React from "react";
import {AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import store from "../../store/rootReducer/rootReducer";
import {connect} from "react-redux";
import playerSlice from "../../store/slices/playerSlice";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import ConnectedTimeLine from "../timeline/timeline";
import ConnectedVolume from "../volumescroll/volumescroll";

const PlayBar = () => {

    const mainStyle = {backgroundColor: 'grey',
        height: '75px',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }

    const btnsStyle = {
        display: 'flex',
        flexDirection: 'row'
    }

// let test = store.subscribe(store.getState())
    const TrackName = ({ track }) => {
        return <div>{track ? track.originalFileName : 'Сейчас ничего не играет'}</div>
    }
    const TrackName1 = connect(state => ({track: state.player.track}))(TrackName)

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black' }}>
            <ConnectedTimeLine/>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        <TrackName1/>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <IconButton color="inherit" aria-label="previous" onClick={() => store.dispatch(playerSlice.actions.prevTrack())}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="play" onClick={() => store.dispatch(playerSlice.actions.play())}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="pause" onClick={() => store.dispatch(playerSlice.actions.pause())}>
                        <PauseIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="stop" onClick={() => store.dispatch(playerSlice.actions.stop())}>
                        <StopIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="next" onClick={() => store.dispatch(playerSlice.actions.nextTrack())}>
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {/* <VolumeScroll></VolumeScroll> */}
                    <ConnectedVolume></ConnectedVolume>
                </Box>
            </Toolbar>
        </AppBar>
    );

}

export default PlayBar
