import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { hideConfirmationDialog, useConfirmationDialogContext } from '../contexts/ConfirmationDialogContext';

export default function ConfirmationDialog() {
    let { items, dispatch } = useConfirmationDialogContext();
    let {
        show,
        data,
        callback,
        title,
        description
    } = items

    const handleClose = () => {
        dispatch(hideConfirmationDialog());
    };

    const handleOk = () => {
        callback && callback(data);
        dispatch(hideConfirmationDialog());
    }

    return (
        <div>
            <Dialog open={show} keepMounted onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOk}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
