import React from "react";
import {useDropzone} from "react-dropzone";
import {useDispatch} from "react-redux";
import {List, Button} from "@mui/material";
import actionUploadAvatar from "../../actions/actionUploadAvatar";

function AvatarDND({userId}) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const dispatch = useDispatch()

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ))

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} name='photo' id='photo'/>
                <p>Переместите сюда новый аватар</p>
            </div>
            <aside>
                <h4>Файл</h4>
                <List>{files}</List>
            </aside>
            <Button onClick={async () => await dispatch(actionUploadAvatar(acceptedFiles[0], userId))}>Загрузить</Button>
        </section>
    );
}

export default AvatarDND

