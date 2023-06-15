import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../store/api/api";
import actionLoadPlaylist from "../../actions/actionLoadPlaylist";
import {useDropzone} from "react-dropzone";
import store from "../../store/rootReducer/rootReducer";
import actionGetNewTrack from "../../actions/actionGetNewTrack";
import {Container, Button, TextField, List, ListItem, ListItemText} from "@mui/material";

import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, useDroppable
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, rectSortingStrategy, SortableContext, useSortable, horizontalListSortingStrategy  } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {arrayMoveImmutable} from 'array-move';

const {usePlaylistUpsertMutation, useTrackFindMutation} = api

const TestItem = ({ пиво: { originalFileName }}, onDelete) => {
    return(
        <div onClick={() => onDelete(originalFileName)} style={{ backgroundColor: "gray", fontSize: "2em", padding: "20px", borderRadius: "20px", margin: "10px" }}>
            {originalFileName}
        </div>)
}

const uploadWResult = async (file) => {
    let fd = new FormData
    fd.append('track', file)
    console.log([...fd.entries()])

    const result = await fetch('http://player.node.ed.asmer.org.ua/track', {
        method: "POST",
        headers: store.getState().auth.token ? {Authorization: 'Bearer ' + store.getState().auth.token} : {},
        body: fd
    })
    return result.json()
}

function Dnd({ items: startItems, render, itemProp, keyField, onChange }) {
    const [items, setItems] = useState(startItems);

    useEffect(() => {
        setItems(startItems);
    }, [startItems]);

    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(items);
        }
    }, [items, onChange]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = ({ active, over }) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        setItems((items) => {
            return arrayMoveImmutable(items, activeIndex, overIndex);
        });
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <Droppable
                id="aaa"
                items={items}
                itemProp={itemProp}
                keyField={keyField}
                render={render}
            />
        </DndContext>
    );
}

const Droppable = ({ id, items, itemProp, keyField, render }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            {items.map((item) => (
                <SortableItem
                    key={item[keyField]}
                    id={item}
                    attributes={{}}
                    listeners={{}}
                    setNodeRef={setNodeRef}
                    transform={{}}
                    transition={{}}
                    render={() => render({ [itemProp]: item })}
                />
            ))}
        </SortableContext>
    );
};

const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        //width: 110,
        //height: 30,
        //display: "flex",
        //alignItems: "center",
        //paddingLeft: 5,
        //border: "1px solid gray",
        //borderRadius: 5,
        //marginBottom: 5,
        //userSelect: "none",
        cursor: "grab",
        //boxSizing: "border-box"
    };

    const Render = props.render

    return (
        <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
            <Render {...{[props.itemProp]:props.item}}/>
        </div>
    );
};



const Editor = ({ playlistId, }) => {
    const dispatch = useDispatch();
    const [playlist, setPlaylist] = useState([]);
    const [plalistName, setPlaylistName] = useState('')
    const [playistDescription, setPlaylistDescription] = useState('')
    const uploadedFiles = useSelector(state => state.uploadedFiles)
    const [createPlaylistMutation, {isLoading, data}] = usePlaylistUpsertMutation()
    const [searchValue, setSearchValue] = useState('')
    const [searchMutation, {isLoading: isLoading2, data: data2}] = useTrackFindMutation()

    useEffect(() => {
        const fetchData = async () => {
            if (playlistId) {
                const base = await dispatch(actionLoadPlaylist(playlistId));
                console.log(base);
                setPlaylist(base);
            }
        };

        fetchData();
    }, [dispatch, actionLoadPlaylist, playlistId])

    const deleter = (trackName) => {
        const updatedPlaylist = playlist.filter(
            (track) => track.originalFileName !== trackName
        )
        console.log(updatedPlaylist)
        setPlaylist([updatedPlaylist])
    }

    const LocalItem = ({ пиво: { originalFileName } }) => (
        <div>
            <TestItem пиво={{ originalFileName }} onDelete={deleter} />
        </div>
    );

    const Basic = () => {
        const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
        const files = acceptedFiles.map(file => (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        ))

        return (
            <section className="container" style={{marginTop: '15px', marginBottom: '15px'}}>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} name='track' id='track'/>
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
                <Button onClick={async () => {
                    const result = await uploadWResult(acceptedFiles[0]);
                    if (result) {
                        const track = await dispatch(actionGetNewTrack(result._id))
                        console.log(track)
                        setPlaylist([...playlist, track]);
                    }
                }}>Send</Button>
            </section>
        );
    }

    return (
        <Container sx={{paddingBottom: '175px'}}>

            <Container sx={{display: 'flex', flexDirection: 'column'}}>
                <Container sx={{marginTop: '15px', marginBottom: '15px'}}>
                    <Basic></Basic>
                </Container>

                <Container style={{maxHeight: '1000px', width: '50vh', overflowY: 'auto'}}>
                    <Dnd items={playlist} render={TestItem} itemProp="пиво" keyField="_id" onChange={newArray => {
                        console.log('new array', newArray)
                        JSON.stringify(playlist) !== JSON.stringify(newArray) ? setPlaylist(newArray) : console.log('new array', newArray)
                    }} />
                </Container>

                <Container>
                    <TextField sx={{ paddingBottom: '15px' }}
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}
                               label="Что ищем?"
                               color="secondary"></TextField>
                    <Button onClick={async () => {
                        const searchResult = await searchMutation({ originalFileName: `/${searchValue}/` })
                        setSearchValue(searchResult.data)
                        console.log(searchResult)
                    }}>Найти плейлист</Button>
                    <Container>
                        <List sx={{height: '500px', overflowY: 'scroll'}}>
                            {isLoading2 && <div style={{display: 'flex', justifyContent: 'center'}}><img src={'https://i.gifer.com/ZZ5H.gif'}/></div>}
                            {data2 &&
                                data2.TrackFind.map((track) => (
                                    <ListItem button key={track._id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <ListItemText onClick={() => {
                                            // setPlaylist([...playlist, track])
                                            const isDuplicate = playlist.some((item) => item._id === track._id);

                                            if (isDuplicate) {
                                                console.log('Track already exists in the playlist')
                                            } else {
                                                setPlaylist([...playlist, track]);
                                                console.log('Track added to the playlist:', track)
                                            }

                                            console.log(playlist)

                                        }} primary={track.originalFileName} secondary={`Автор: ${track.owner.nick || ''}`} />
                                    </ListItem>
                                ))}
                        </List>
                    </Container>
                </Container>

            </Container>
            <Container sx={{display: 'flex', flexDirection: 'column'}}>
                <TextField sx={{marginTop: '15px', marginBottom: '15px'}} label='Название плейлиста' value={plalistName} onChange={e => setPlaylistName(e.target.value)}/>
                <TextField sx={{marginTop: '15px', marginBottom: '15px'}} label='Описание плейлиста' value={playistDescription} onChange={e => setPlaylistDescription(e.target.value)}></TextField>
                <Button sx={{marginTop: '15px', marginBottom: '15px'}} onClick={() => createPlaylistMutation( {name: plalistName, description: playistDescription, tracks: playlist.map(({ url, id3, owner, originalFileName, ...rest }) => rest)})}>Создать плейлист</Button>
            </Container>

        </Container>
    );
};

export default Editor