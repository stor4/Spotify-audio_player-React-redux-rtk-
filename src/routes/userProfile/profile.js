import React from "react";
import store from "../../store/rootReducer/rootReducer";
import api from "../../store/api/api";
import backendURL from "../../data/backEndURL";
import {Container, Typography, List, ListItem, Box} from "@mui/material";
import AvatarDND from "../../components/avatarDND/avatarDND";

const {useUserInfoQuery} = api

const Profile = () => {
    const authSubId = store.getState().auth.payload.sub.id
    const { isLoading, data } = useUserInfoQuery({ _id: {_id: authSubId} })

    console.log(isLoading, data, authSubId)

    const Avatar = () => {
        if (data?.UserFindOne){
            return(
                <div>
                    <img src={backendURL + data.UserFindOne.avatar.url} style={{height: '200px', width: '200px'}}></img>
                </div>
            )
        }
        if(!data){
            return(
                <div>
                    <h5>Нет авы</h5>
                </div>
            )
        }
    }
    return(
        <Container sx={{marginTop: '75px', marginBottom: '175px'}}>
            <Typography variant='h3'>Профиль</Typography>
            <Typography variant='h4'>Аватарка</Typography>
            <Box>
                <List>
                    <Avatar></Avatar>
                    <ListItem><Typography>Логин: </Typography>{data && data.UserFindOne.login}</ListItem>
                    <ListItem><Typography>Ник: </Typography>{data ? data.UserFindOne.nick : 'Нет никнейма'}</ListItem>
                </List>
                <Typography variant='h6'>Загрузить аву</Typography>
                <AvatarDND userId={authSubId}/>
            </Box>
        </Container>
    )
}

export default Profile
