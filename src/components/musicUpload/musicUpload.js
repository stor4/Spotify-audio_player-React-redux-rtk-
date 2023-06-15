import React from "react";
import {useDropzone} from "react-dropzone";
import {List, Button} from "@mui/material";
import uploadTrack from "../../actions/uploadTrack";

function MusicUpload({userId}) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    // const dispatch = useDispatch()

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ))

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} name='track' id='track'/>
                <p>Переместите сюда ваш трек</p>
            </div>
            <aside>
                <h4>Файл</h4>
                <List>{files}</List>
            </aside>
            <Button onClick={async () =>  await uploadTrack(acceptedFiles[0])}>Загрузить</Button>
        </section>
    );
}

export default MusicUpload