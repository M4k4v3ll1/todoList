import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "../features/todolistsList/TodoListsList";
import IntegrationNotistack from "../components/errorSnackbar/ErrorSnackbar";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";

type AppPropsType = {
    demoMode?: boolean
}
function App({demoMode = false}: AppPropsType) {
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
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
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodoListsList demoMode={demoMode}/>
            </Container>
        </div>
    );
}

export default App;
