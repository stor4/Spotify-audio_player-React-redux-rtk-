import React, {useState} from "react";
import {useDispatch} from "react-redux";
import api from "../../store/api/api";
import Editor from "../../components/editor/editor";
import {Container, Typography, List, ListItem, Button, ListItemText, TextField, } from "@mui/material";

const {useTrackFindMutation, usePlaylistFindMutation} = api


const EditPage = () => {
    const dispatch = useDispatch()
    const [newPlaylistSwitch, setNewPlaylistSwitch ] = useState(false)
    const [oldPlaylistSwitch, setOldPlaylistSwitch ] = useState(false)

    const NewPlaylist = () => {
        const [searchMutation, {isLoading, data}] = useTrackFindMutation()
        const [searchValue, setSearchValue] = useState('')
        const [playlistValue, setPlaylistValue] = useState([])

        return(
            <Editor></Editor>
        )
    }

    const OldPlaylist = () => {
        const [searchMutation, {isLoading, data}] = usePlaylistFindMutation()
        const [searchValue, setSearchValue] = useState('')
        const [editorOpen, setEditorOpen] = useState(false)
        const [playlistValue, setPlaylistValue] = useState()
        return(
            <Container sx={{dispaly: 'flex', flexDirection: 'column', marginTop: '15px', marginBottom: '15px'}} >
                <Typography sx={{marginTop: '15px', marginBottom: '15px'}} variant='h4'>Введите название плейлиста для редактирования</Typography>
                <Container sx={{dispaly: 'flex', flexDirection: 'column'}}>
                    <TextField sx={{ paddingBottom: '15px' }}
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}
                               label="Что ищем?"
                               color="secondary"></TextField>
                    <Button onClick={async () => {
                        const searchResult = await searchMutation({ name: `/${searchValue}/` })
                        setSearchValue(searchResult.data)
                    }}>Найти плейлист</Button>
                    <Container>
                        <List sx={{height: '500px', overflowY: 'scroll'}}>
                            {isLoading && <div style={{display: 'flex', justifyContent: 'center'}}><img src={'https://i.gifer.com/ZZ5H.gif'}/></div>}
                            {data &&
                                data.PlaylistFind.map((playlist) => (
                                    <ListItem button key={playlist._id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <ListItemText onClick={() => {
                                            setPlaylistValue(playlist._id)
                                            setEditorOpen(true)}} primary={playlist.name} secondary={`Автор: ${playlist.owner.nick || ''}`} />
                                    </ListItem>
                                ))}
                        </List>
                    </Container>
                    {editorOpen === true && <Editor playlistId={playlistValue}></Editor>}
                </Container>

            </Container>
        )
    }

    return(
        <Container sx={{paddingTop: '75px'}}>
            <Typography variant='h2'>Редактор</Typography>
            <Container>
                <Button onClick={() => {setNewPlaylistSwitch(true)
                    setOldPlaylistSwitch(false)}}>Создать новый</Button>
                <Button onClick={() => {setNewPlaylistSwitch(false)
                    setOldPlaylistSwitch(true)}}>Редактировать</Button>
            </Container>
            {newPlaylistSwitch === true && <NewPlaylist/>}
            {oldPlaylistSwitch === true && <OldPlaylist/>}

        </Container>
    )
}

export default EditPage
