import React from 'react';
import './App.css';
import Menu from "@mui/icons-material/Menu";
import {TodoListsList} from "../features/todolistsList/TodoListsList";
import IntegrationNotistack from "../components/errorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {useAppSelector} from "./store";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/login/Login";

type AppPropsType = {
    demoMode?: boolean
}

function App({demoMode = false}: AppPropsType) {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    return (
        <BrowserRouter>
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
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                </AppBar>
                {status === "loading" && <LinearProgress/>}
                <Container fixed>
                    <Route path={'/'} element={<TodoListsList/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
