import React, {useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import playerSlice from "../../store/slices/playerSlice";
import {Slider, Box} from "@mui/material";

const VolumeScroll = () => {
    const dispatch = useDispatch()
    const volume = useSelector((state) => state.player.volume)
    const [volume1, setVolume] = useState(volume)

    const handleVolumeChange = (e) => {
        setVolume(e.target.value)
        const newVolume = parseFloat(e.target.value)
        dispatch(playerSlice.actions.setVolume(newVolume))
    }

    return (
        <Box sx={{ width: 200 }}>
            <Slider
                value={volume1}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.1}
                aria-label="Volume Slider"
                color="secondary"
            />
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        currentTime: state.player.currentTime,
        duration: state.player.duration,
    };
};

const ConnectedVolume = connect(mapStateToProps)(VolumeScroll)

export default ConnectedVolume
