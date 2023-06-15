import React from "react";
import api from "../store/api/api";

const actionLoadPlaylist = (playlistId) =>
    async dispatch => {
        try {
            const result = await dispatch(api.endpoints.playlistFind.initiate({ _id: playlistId }));
            console.log(result);
            return result.data?.PlaylistFind[0]?.tracks
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

export default actionLoadPlaylist