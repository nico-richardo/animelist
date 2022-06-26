/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Fragment, useMemo, useState } from "react";
import { useCollectionContext } from '../contexts/CollectionContext';
import StyledList from '../base_component/StyledList';
import AddShowCollectionDialog from '../component/AddShowCollectionDialog'
import { Box, Button, CardMedia, Divider, Stack } from '@mui/material';
import { setCollectionSelectedShow, useSelectedShowContext } from '../contexts/SelectedShowContext';
import parse from 'html-react-parser';

function ShowDetailPage(props) {
    const { items : collections, dispatch } = useCollectionContext();
    const { items: itemsSelected } = useSelectedShowContext();
    const selectedShow = itemsSelected.data;

    const selectedCollection = itemsSelected.collections;
    let [open, setOpen] = useState(false);

    const collectionData = useMemo(() => Object.entries(selectedCollection).map((e) => {
        let firstImage = e[1].length > 0 ? e[1][0]['coverImage']['large'] : ''
        return {
            label: e[0],
            image: firstImage
        }
    }), [selectedCollection])

    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' }
    );

    const startDateString = () => {
        let newDate = new Date(selectedShow.startDate.year, selectedShow.startDate.month, selectedShow.startDate.day);
        return `${selectedShow.startDate.day} ${newDate.toLocaleString('default', { month: 'short' })} ${selectedShow.startDate.year}`
    }

    const status = () => {
        switch (selectedShow.status) {
            case 'FINISHED':
                return 'Finished';
            case 'NOT_YET_RELEASED':
                return 'Not Yet Released';
            case 'HIATUS':
                return 'Hiatus';
            case 'RELEASING':
                return 'Ongoing';
            case 'CANCELLED':
                return 'Cancelled';

            default:
                return 'Unknown';
        }
    }

    const goToCollectionDetail = (value, index) => {
        alert('Page not done');
    }

    const toggleAddDialog = (isNew = false) => {
        setOpen(!open);
        if(isNew) {
            dispatch(setCollectionSelectedShow(collections))
        }
    }

    return <Fragment>
        <div css={css`
    display:inline-block;
    margin-bottom: 1%;
    text-align: center;
    `}>
            <CardMedia
                component="img"
                sx={{
                    height: 350,
                    width: '100vw',
                    maxHeight: { xs: 350, md: 250 }
                }}
                css={css`
        background-size: cover;
        background-position: center center;`}
                image={selectedShow.bannerImage}
                alt="No Image"
            />
        </div>
        <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={1}
            css={css`
            margin-left: 2.5%; 
            margin-right: 2.5%;`}>

            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                css={css`
                text-align:start;
                font-family: Tahoma, Arial, Helvetica, sans-serif;`}
            >
                <Box
                    component="img"
                    sx={{
                        height: 350,
                        width: 233,
                        maxHeight: { xs: 350, md: 250 },
                        maxWidth: { xs: 233, md: 167 },
                    }}
                    css={css`
                    background-color: rgba(127,0,0,0.3) `}
                    alt="No Image"
                    src={selectedShow.coverImage.large}
                />
                <div css={css`
                    flex-direction:row;
                    background-color: rgba(0,0,0,0.8);
                    color:  rgba(255,255,0,0.9);
                    padding:3vh 5vh;
                `}>
                    <h1
                        css={css`
                     font-family:fantasy;
                     font-weight:normal;`}
                    >
                        {selectedShow.title.english}
                    </h1>
                    <div css={css`flex-direction:row;margin-bottom: 6px;`}>
                        <span css={css`color:#888888; margin-right:3px;`}>Country : </span>
                        <span>{regionNames.of(selectedShow.countryOfOrigin)}</span>
                    </div>
                    <div css={css`flex-direction:row;margin-bottom: 6px;`}>
                        <span css={css`color:#888888; margin-right:3px;`}>Genres : </span>
                        <span>{selectedShow.genres.toString()}</span>
                    </div>
                    <div css={css`flex-direction:row;margin-bottom: 6px;`}>
                        <span css={css`color:#888888; margin-right:3px;`}>Date aired : </span>
                        <span>{startDateString}</span>
                    </div>

                    <div css={css`flex-direction:column;margin-bottom: 6px;`}>
                        <div css={css`flex-direction:row;margin-right: 5vw; display: inline;`}>
                            <span css={css`color:#888888; margin-right:3px;`}>Status : </span>
                            <span>{status}</span>
                        </div>
                        <div css={css`flex-direction:row;margin-right: 5vw;display: inline;`}>
                            <span css={css`color:#888888; margin-right:3px;`}>Episodes : </span>
                            <span>{selectedShow.episodes ? selectedShow.episodes : '?'}</span>
                        </div>
                        <div css={css`flex-direction:row;display: inline;`}>
                            <Button variant='contained' onClick={toggleAddDialog}>
                                Bookmark to...
                            </Button>
                        </div>
                    </div>

                    <div css={css`margin-bottom: 24px; margin-top:23px; font-style:italic`}>
                        <span css={css`color:#888888; margin-right:3px;`}>Summary : </span>
                    </div>
                    <div>{parse(selectedShow.description)}</div>
                </div>
            </Stack>
            <div css={css`
    display:inline-block;
    margin-bottom: 2.5%;
    text-align: start;
    `}>
                <h4>Collections List</h4>
            </div>
            {collectionData && collectionData.length ? <StyledList
                data={collectionData}
                titleField={'label'}
                imageField={'image'}
                onClick={goToCollectionDetail}
                isDelete={false}
            /> : <div css={css`
            height: 10vh;
            justify-content: center;
            align-content: center;
            `}
            ><h4 css={css`font-weight:lighter`}> Not added into any collection yet. Start adding !</h4></div>}
        </Stack>
        <AddShowCollectionDialog
            open={open}
            callback={() => toggleAddDialog(true)}
        />

    </Fragment>
}
export default ShowDetailPage