/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import { useMemo, useState } from "react";
import { removeCollection, useCollectionContext } from '../contexts/CollectionContext';
import StyledList from '../base_component/StyledList';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { showConfirmationDialog, useConfirmationDialogContext } from '../contexts/ConfirmationDialogContext';
import AddCollectionDialog from '../component/AddCollectionDialog';

function CollectionPage(props) {
    const theme = useTheme();
    const { items, dispatch } = useCollectionContext();
    const { dispatch: dispatchDialog } = useConfirmationDialogContext();
    let [open, setOpen] = useState(false);

    const collectionData = useMemo(() => Object.entries(items).map((e) => {
        let firstImage = e[1].length > 0 ? e[1][0]['coverImage']['large'] : ''
        return {
            label: e[0],
            image: firstImage
        }
    }), [items])

    const goToCollectionDetail = (value, index) => {
        alert('Page not done');
    }

    const toggleAddDialog = () => {
        setOpen(!open);
    }
    const onDelete = (value) => {
        dispatchDialog(showConfirmationDialog(
            {
                data: value.label,
                title: 'DELETE ITEM',
                description: `Are you sure to delete this collection "${value.label}"?`,
                callback: (data) => { dispatch(removeCollection(data)) }
            }
        ));
    }
    return <div css={css`
    margin-left: 2.5%; 
    margin-right: 2.5%;`}>
        <div css={css`
        display:inline-block;
        margin-bottom: 2.5%;
        width: 100%;
        text-align: center;
        `}>
            <h1>My Collection</h1>
        </div>
        <div css={css`
        display:inline-block;
        text-align:start;
        width: 100%;
        margin: 2vh 0;
        `}>
            <Button
                css={css`
            background-color:${theme.colors.red};
            &:hover {
                background-color:${theme.colors.darkRed};
            }`}
                variant="contained"
                startIcon={<Add />}
                onClick={toggleAddDialog}>
                Add Collection
            </Button>
        </div>
        <StyledList
            data={collectionData}
            titleField={'label'}
            imageField={'image'}
            onClick={goToCollectionDetail}
            onDelete={onDelete}
        />
        <AddCollectionDialog
            open={open}
            callback={toggleAddDialog}
        />
    </div>
}
export default CollectionPage