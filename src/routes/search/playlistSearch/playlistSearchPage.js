import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Container, Box, TextField, Button, Typography, List, ListItem, ListItemText, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import api from "../../../store/api/api";
import actionFindPlaylist from "../../../actions/actionFindPlaylist";

const {usePlaylistFindMutation} = api

const PagePlaylistSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [result, setResult] = useState("");
    const [searchMutation, { isLoading, data }] = usePlaylistFindMutation();
    const dispatch = useDispatch();
    console.log(data, isLoading, searchValue);

    return (
        <Container sx={{ marginTop: '75px' }}>
            <Typography variant='h2'>Поиск плейлистов</Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '15px' }}>
                <TextField
                    sx={{ paddingBottom: '15px' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    label="Что ищем?"
                    color="secondary"
                />
                <Button
                    variant='outlined'
                    color="secondary"
                    sx={{ margin: '15px' }}
                    onClick={async () => {
                        const searchResult = await searchMutation({ name: `/${searchValue}/` });
                        setResult(searchResult.data);
                        console.log(searchResult);
                    }}
                >
                    Поиск
                </Button>
            </Container>
            {isLoading && <div style={{display: 'flex', justifyContent: 'center'}}><img src={'https://i.gifer.com/ZZ5H.gif'}/></div>}
            {data && (
                <List component="ul" sx={{ marginBottom: '60px' }}>
                    {data && Array.isArray(data.PlaylistFind) && (
                        <List component="ul" sx={{ marginBottom: '60px' }}>
                            {data && Array.isArray(data.PlaylistFind) && (
                                <List component="ul" sx={{ marginBottom: '60px' }}>
                                    {data.PlaylistFind.map((playlist) => (
                                        <Accordion key={playlist._id}>
                                            <AccordionSummary onClick={() => dispatch(actionFindPlaylist(playlist))}>
                                                <ListItemText primary={playlist.name} secondary={`Автор: ${playlist.owner.nick || ''}`} />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List component="ul">
                                                    {playlist.tracks && Array.isArray(playlist.tracks) && playlist.tracks.map((track) => (
                                                        <ListItem key={track.id}>
                                                            <ListItemText primary={track.originalFileName} secondary={track.url} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </List>
                            )}
                        </List>
                    )}

                </List>
            )}
        </Container>
    );
};


export default PagePlaylistSearch
