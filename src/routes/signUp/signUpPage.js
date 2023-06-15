import React, {useState} from "react";
import api from "../../store/api/api";
import {useDispatch} from "react-redux";
import {Container, Box, TextField, Button, Typography} from "@mui/material";
import actionFullSignUp from "../../actions/actionFullSignUp";

const {useCreateUserMutation} = api

const SignUpPage = () => {
    const [createUserMutation, {isLoading, data}] = useCreateUserMutation()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    console.log('SIGNIN FORM', isLoading, data)
    return(
        <Container sx={{marginTop: '75px'}}>
            <Typography variant='h2' sx={{paddingBottom: '15px'}}>Регистрэйшн</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <TextField sx={{paddingBottom: '15px'}} value={login} onChange={e => setLogin(e.target.value)} label="Логин" color="secondary"></TextField>
                <TextField sx={{paddingBottom: '15px'}} value={password} type='password' onChange={e => setPassword(e.target.value)} label="Пароль" color="secondary"></TextField>
                <Button variant='outlined' color="secondary" onClick={async () => {dispatch(actionFullSignUp(login, password))}}>Зарегаться</Button>
            </Box>

        </Container>
    )
}

export default SignUpPage
