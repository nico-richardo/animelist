/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types'

import { addCollection, useCollectionContext } from '../contexts/CollectionContext';
import { Divider, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';

function AddCollectionDialog(props) {
    let {
        open,
        callback
    } = props

    const theme = useTheme();
    let { items, dispatch } = useCollectionContext();
    let [data, setData] = useState('');
    let [error, setError] = useState(false);

    const helperText = useMemo(() => {
        if (error) {
            return 'Collection Name has been used or have special Char!'
        } else {
            return ''
        }
    }, [error]);

    const handleChange = (event) => {
        const currData = event.target.value;
        setData(currData);
        const isUsed = Object.keys(items).includes(currData);
        const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const isSpecialChars = specialChars.test(currData);
        setError(!currData || isUsed || isSpecialChars);
    };

    useEffect(() => {
        setData('');
    }, [open])

    const handleClose = () => {
        callback && callback();
        setData('');
    };

    const handleOk = () => {
        callback && callback();
        dispatch(addCollection(data));
    }

    return (
        <div>
            <Dialog open={open} fullWidth onClose={handleClose}>
                <DialogTitle
                    css={css`
                    background-color: ${theme.colors.redDark};
                    color: white;
                    font-weight:bold;
                `}>
                    Add Collection
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        autoFocus
                        autoComplete='off'
                        error={error}
                        margin="dense"
                        id="name"
                        label="Collection Name"
                        fullWidth
                        variant="filled"
                        helperText={helperText}
                        value={data}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOk} disabled={error}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddCollectionDialog.propTypes = {
    open: PropTypes.bool,
    callback: PropTypes.func
}

export default AddCollectionDialog