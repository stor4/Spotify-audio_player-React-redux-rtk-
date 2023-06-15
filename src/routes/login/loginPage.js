import React, {useState} from "react";
import {useDispatch} from "react-redux";
import api from "../../store/api/api";
import {Container, Box, TextField, Button} from "@mui/material";
import actionFullLogin from "../../actions/actionFullLogin/actionFullLogin";

const {useLoginMutation} = api

const LoginForm = () => {
    const [loginMutation, {isLoading, data}] = useLoginMutation()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    console.log('LOGIN FORM', isLoading, data)
    return(

        <Container sx={{marginTop: '75px'}}>
            <h1>ВХОД</h1>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <TextField sx={{paddingBottom: '15px'}} value={login} onChange={e => setLogin(e.target.value)} label="Логин" color="secondary"></TextField>
                <TextField sx={{paddingBottom: '15px'}} value={password} type='password' onChange={e => setPassword(e.target.value)} label="Пароль" color="secondary"></TextField>
                <Button variant='outlined' color="secondary" onClick={async () => {dispatch(actionFullLogin(login, password))}}>Войти</Button>
            </Box>
        </Container>

    )
}

export default LoginForm