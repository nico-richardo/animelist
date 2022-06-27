/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import PropTypes from 'prop-types'

import { addShowCollection, useCollectionContext } from '../contexts/CollectionContext';
import { Autocomplete, Chip, Divider, Stack, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useSelectedShowContext } from '../contexts/SelectedShowContext';

function AddShowCollectionDialog(props) {
    let {
        open,
        callback
    } = props

    const theme = useTheme();
    let { items: itemsSelected } = useSelectedShowContext();
    let { items: collections, dispatch } = useCollectionContext();
    let [strNewCollection, setStrNewCollection] = useState('');
    let [arrNewCollections, setArrNewCollections] = useState([]);

    const selectedShow = itemsSelected.data;
    let selectedCollection = itemsSelected.collections;
    const objCurrKeys = Object.keys(selectedCollection);
    const collectionKeys = Object.keys(collections);

    const dialogTitle = "Add `" + selectedShow.title.english + "` to Collection"

    const handleDeleteChip = (value) => {
        let newCollections = arrNewCollections.filter(obj => obj !== value);
        setArrNewCollections(newCollections);
    }

    const handleChange = (event, newValue) => {
        setStrNewCollection(newValue);
    };

    const handleAdd = () => {
        if(arrNewCollections.includes(strNewCollection)) {
            return;
        }
        setArrNewCollections(oldArray => [...oldArray, strNewCollection]);
        setStrNewCollection('');
    }

    const handleClose = () => {
        callback && callback();
    };

    const handleOk = () => {
        dispatch(addShowCollection({arrNewCollections, data: selectedShow}));
        setStrNewCollection('');
        setArrNewCollections([]);
        callback && callback();
    }

    return (
        <div>
            <Dialog open={open} sx={{ height: '80vh' }} fullWidth onClose={handleClose}>
                <DialogTitle
                    css={css`
                    background-color: ${theme.colors.darkRed};
                    color: white;
                    font-weight:bold;
                `}>
                    {dialogTitle}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                    >
                        <Stack direction="column" spacing={1}>
                            <div css={css`margin-bottom: 24px; margin-top:23px;`}>
                                <span css={css`color:#888888; margin-right:3px;`}>Add into : </span>
                            </div>
                            <Stack direction="row" spacing={1}>
                                {objCurrKeys && objCurrKeys.map((value, index) => {
                                    return <Chip
                                        key={'collectionChip' + index}
                                        label={value}
                                    />
                                })}
                                {arrNewCollections && arrNewCollections.map((value, index) => {
                                    return <Chip
                                        key={'newCollectionChip' + index}
                                        label={value}
                                        onDelete={handleDeleteChip}
                                    />
                                })}
                            </Stack>
                        </Stack>
                        <div css={css`flex-direction:row;display:flex;align-items: center;`}>
                            <span css={css`color:#888888;display: inline; margin-right: 20px;`}>New Collection : </span>
                            <Autocomplete
                                css={css`display: inline;`}
                                inputValue={strNewCollection}
                                onInputChange={handleChange}
                                selectOnFocus
                                handleHomeEndKeys
                                id="add-new-collection"
                                options={collectionKeys}
                                renderOption={(props, option) => <li {...props}>{option}</li>}
                                sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <div css={css`flex-direction:row;display: inline; margin-left: 20px;`}>
                                <Button variant='contained' onClick={handleAdd}
                                    disabled={!strNewCollection}
                                    css={css`
                                    background-color:${theme.colors.red};
                                    &:hover {
                                        background-color:${theme.colors.darkRed};
                                    }`}>
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddShowCollectionDialog.propTypes = {
    open: PropTypes.bool,
    callback: PropTypes.func
}

export default AddShowCollectionDialog