import React from 'react'
import {connect, useDispatch} from "react-redux";
import playerSlice from "../../store/slices/playerSlice";
import {Slider, Box, Typography } from "@mui/material";

const Timeline = ({ currentTime, duration }) => {
    const dispatch = useDispatch();


    const handleSeek = (event, newTime) => {
        dispatch(playerSlice.actions.setCurrentTime(newTime))
    };

    const formattedTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };

    const progress = (currentTime / duration) * 100;

    return (
        <Box>
            <Slider
                value={currentTime}
                min={0}
                max={duration}
                step={0.1}
                onChange={handleSeek}
                aria-label="Timeline Slider"
                color="secondary"
            />
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">{formattedTime(currentTime)}</Typography>
                <Typography variant="caption">{formattedTime(duration)}</Typography>
            </Box>
            {/* <Box width="100%" height="5px" bgcolor="#ccc">
        <Box width={`${progress}%`} height="100%" bgcolor="#000" />
      </Box> */}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.player.currentTime,
        duration: state.player.duration,
    };
};

const ConnectedTimeLine = connect(mapStateToProps)(Timeline)
export default ConnectedTimeLine

