import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

export default function CustomizedSnackbars() {
    const error = useAppSelector<string | null>(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
      dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
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