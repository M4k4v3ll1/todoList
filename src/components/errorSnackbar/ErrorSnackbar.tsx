import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

export default function CustomizedSnackbars() {
    const error = useSelector<AppRootState, string | null>(state => state.app.error)
    const dispatch = useDispatch()
    const isOpen = error !== null
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            dispatch(setAppErrorAC(null))
        }
      dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                {error}
            </Alert>
        </Snackbar>
    );
}