import React, {useCallback, useEffect} from 'react';
import './App.css';
import Menu from "@mui/icons-material/Menu";
import {TodoListsList} from "../features/todolistsList/TodoListsList";
import IntegrationNotistack from "../components/errorSnackbar/ErrorSnackbar";
import {RequestStatusType, setIsInitializedTC} from "./app-reducer";
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {useAppDispatch, useAppSelector} from "./store";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {logoutTC} from "../features/login/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";

type AppPropsType = {
    demoMode?: boolean
}

function App({demoMode = false}: AppPropsType) {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    useEffect(() => {
        dispatch(setIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
            <div className="App">
                <IntegrationNotistack/>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton edge={'start'} color='inherit' aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6'>
                            News
                        </Typography>
                        {isLoggedIn && <Button color='inherit' onClick={logOutHandler}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                {status === "loading" && <LinearProgress/>}
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoListsList/>}></Route>
                        <Route path={'/login'} element={<Login/>}></Route>
                        <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}></Route>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}></Route>
                    </Routes>
                </Container>
            </div>
    );
}

export default App;
