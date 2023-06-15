import React, {useState} from "react";
import {AppBar, Toolbar, Box, Typography, IconButton, Container, Drawer, List, ListItem } from "@mui/material";
import {Link} from 'react-router-dom'
import  MenuIcon  from '@mui/icons-material/Menu';
import LoginStatus from "../loginStatus/loginStatus";

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    return(
        <div>
            <AppBar  sx={{backgroundColor: 'black', }}>
                <Container>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
                            <MenuIcon/>

                        </IconButton>
                        <Typography variant='h6'>Stor4ify</Typography>
                        <Box>
                            {/* <Button color='inherit' variant='outlined'>Войти</Button> */}
                            <LoginStatus/>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
                <List sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}} >
                    <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', color: 'white'}}>Stor4ify</Typography>
                    <ListItem><Link to="/">Главная</Link></ListItem>
                    <ListItem><Link to="/search">Поиск</Link></ListItem>
                    <ListItem><Link to="/playlistsearch">Поиск плейлистов</Link></ListItem>
                    <ListItem><Link to='/mymusic'>Моя музыка</Link></ListItem>
                    <ListItem><Link to='/editor'>Редактирование/cоздание плейлистов</Link></ListItem>
                    <ListItem><Link to='/upload'>Загрузить</Link></ListItem>
                </List>

            </Drawer>

        </div>
    )
}

export default Header