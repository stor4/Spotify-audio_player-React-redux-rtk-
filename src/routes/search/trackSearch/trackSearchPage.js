import React, {useState} from "react";
import {Container, Box, TextField, Button, Typography, List, ListItem, ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import api from "../../../store/api/api";
import actionFindTrack from "../../../actions/actionFindTrack";

const {useTrackFindMutation} = api

const PageTrackSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const [result, setResult] = useState('')
    const [searchMutation, {isLoading, data}] = useTrackFindMutation()
    const dispatch = useDispatch()
    console.log(data, isLoading, searchValue)

    return(
        <Container sx={{marginTop: '75px'}}>
            <Typography variant='h2'>Поиск треков</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '15px'}}>
                <TextField sx={{paddingBottom: '15px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} label="Что слушаем?" color="secondary"></TextField>
                <Button variant='outlined' color="secondary" sx={{margin: '15px', }} onClick={async () => {
                    const searchResult = await searchMutation({originalFileName: `/${searchValue}/`})
                    setResult(searchResult.data)
                    console.log(searchResult)
                }}>Поиск</Button>
            </Box>
            <List component="ul" sx={{marginBottom: '60px'}}>
                <ListItem sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {isLoading && <div style={{display: 'flex', justifyContent: 'center'}}><img src={'https://i.gifer.com/ZZ5H.gif'}/></div>}
                    {data && data.TrackFind.map((track, index) => <ListItem button sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><ListItemText key={track._id} primary={track.originalFileName} onClick={() => {dispatch(actionFindTrack(data, index))}}/></ListItem>)}
                </ListItem>

            </List>

        </Container>
    )
}

export default PageTrackSearch