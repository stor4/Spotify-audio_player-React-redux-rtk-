import React from "react";
import {useDispatch} from "react-redux";
import api from "../../store/api/api";
import {Container, Box, TextField, Button, Typography, List, ListItem, ListItemText} from "@mui/material";
import actionFindTrack from "../../actions/actionFindTrack";
import actionFindPlaylist from "../../actions/actionFindPlaylist";
import store from "../../store/rootReducer/rootReducer";


const {useTrackFind2Query, usePlaylistFind2Query} = api

const MyMusic = () => {
    const dispatch = useDispatch()
    const {isLoading: isLoading1, data: data1} = useTrackFind2Query({___owner: store.getState().auth.payload ? store.getState().auth.payload.sub.id : ""})
    const {isLoading: isLoading2, data: data2} = usePlaylistFind2Query({___owner: store.getState().auth.payload ? store.getState().auth.payload.sub.id : ""})
    console.log(data1, isLoading1)
    console.log(data2, isLoading2)

    const columns = {
        display: 'flex',
        flexDirection: 'row'
    }

    if(isLoading2 && isLoading1){
        return <div style={{display: 'flex', justifyContent: 'center'}}><img src={'https://i.gifer.com/ZZ5H.gif'}/></div>
    }
    if(data2 && data1){
        return(
            <Container sx={{paddingTop: '75px'}}>
                <Typography variant='h2'>Моя музыка</Typography>
                <Container sx={columns}>

                    <Container>
                        <Typography>Треки</Typography>
                        <List>
                            {data1 && data1.TrackFind.map((track, index) => <ListItem button sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><ListItemText key={track._id} primary={track.originalFileName} onClick={() => {dispatch(actionFindTrack(data1, index))}}/></ListItem>)}
                        </List>
                    </Container>

                    <Container>
                        <Typography>Плейлисты</Typography>
                        <List>
                            {data2 && data2.PlaylistFind.map((playlist) => <ListItem button sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><ListItemText key={playlist._id} primary={playlist.name} onClick={() => {dispatch(actionFindPlaylist(playlist))}}/></ListItem>)}
                        </List>
                    </Container>

                </Container>
            </Container>
        )
    }
}

export default MyMusic
