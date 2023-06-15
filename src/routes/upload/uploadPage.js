import React from "react";
import {Container, Typography} from "@mui/material";
import MusicUpload from "../../components/musicUpload/musicUpload";

const PageUploadMusic = () => {
    return(
        <Container sx={{marginTop: '75px'}}>
            <Typography variant='h2'>Загрузить музыку</Typography>
            <MusicUpload></MusicUpload>
        </Container>
    )}

export default PageUploadMusic