import React from 'react'
import {Typography, Container, } from '@mui/material'
const PageMain = () =>
    <main style={{background: 'linear-gradient(to right, blue, pink)', width: '100%', height: '100vh', paddingTop: '75px'}}>
        <Container sx={{width: '60%'}}>
            <Typography variant='h1'>Добро пожаловать</Typography>
            <Typography variant='h3'>Where can I get some?</Typography>
            <Typography variant='h6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        </Container>
    </main>

export default PageMain