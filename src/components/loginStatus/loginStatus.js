import React, {useState, useEffect} from "react";
import {useDispatch, useSelector, connect} from "react-redux";
import actionAboutMe from "../../actions/actionAboutMe/actionAboutMe";
import {AppBar, Toolbar, Box, Typography, Button, Container, Drawer, List, ListItem } from "@mui/material";
import {Link} from "react-router-dom";
import actionLogout from "../../actions/actionLogout/actionLogout";
import backendURL from "../../data/backEndURL";


const LoginStatus =  () => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState(null)
    const dispatch = useDispatch()
    const result = useSelector(state => state.auth.payload)


    useEffect(() => {
        const actionGetUserImg = async () => {
            if(name !== ''){
                const userInfo = await dispatch(actionAboutMe())
                const avaUrl = userInfo.UserFindOne?.avatar?.url
                setUrl(avaUrl)
            }
        }
        actionGetUserImg();
    }, [dispatch, name, url, ]);
    // console.log(url)

    const Test = ({name, url}) => {
        return (
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {name && url !== null && <img src={backendURL + url} style={{height: '50px', width: '50px', border: 'solid 2px white' }} alt={'Нет авы'}></img>}
                <Typography variant='h6'>{name ? <Link to='/profile'>{name.sub.login}</Link> : ''}</Typography>
            </Box>
        )
    }

    const LogoName = ({name, url}) => {
        if(url === null){
            return(
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Typography variant='h6'>{name ? <Link to='/profile'>{name.sub.login}</Link> : ''}</Typography>
                </Box>
            )
        }
        if(url != null){
            return(
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {name && <img src={backendURL + url} style={{height: '50px', width: '50px', border: 'solid 2px white' }} alt={'Нет авы'}></img>}
                    <Typography variant='h6'>{name ? <Link to='/profile'>{name.sub.login}</Link> : ''}</Typography>
                </Box>
            )
        }
    }

    const LoginBTNS = ({name}) => {
        const dispatch = useDispatch()
        return <Container>
            {name ? <Button color="secondary" onClick={async () => {dispatch(actionLogout())} }>Выйти</Button> : <Container><Link to="/login"><Button color="secondary">Войти</Button></Link><Link to="/signup"><Button color="secondary">Зарегаться</Button></Link></Container>}
        </Container>
    }

    const ConnectedBTNS1 = connect(state => ({name: state.auth.payload}))(LoginBTNS)
    // const ConnectedName = connect(state => ({name: state.auth.payload, url: url}))(Test)

    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <LogoName url={url} name={result}></LogoName>
            {/* <ConnectedName/> */}
            <ConnectedBTNS1/>
        </Container>
    )
}

export default LoginStatus
