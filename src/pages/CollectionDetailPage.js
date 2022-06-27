/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from "react";
import { MenuItem, Pagination, Select, Stack } from '@mui/material';
import CardList from '../base_component/CardList';
import { deleteShowCollection, useCollectionContext } from '../contexts/CollectionContext';
import { setSelectedShow } from '../contexts/SelectedShowContext';
import { useNavigate } from 'react-router-dom';
import { setSelectedCollection, useSelectedCollectionContext } from '../contexts/SelectedCollectionContext';

const CollectionDetailPage = (props) => {
    const options = [10, 20, 50, 100];
    let [page, setPage] = useState(1);
    let [perPage, setPerPage] = useState(10);
    let { items: collections, dispatch:dispatchCollections } = useCollectionContext();
    let { items, dispatch } = useSelectedCollectionContext();
    let navigate = useNavigate();

    let  data = items.data;
    const totalPage = data?.Page?.pageInfo?.total ? Math.ceil(data.Page.pageInfo.total / perPage) : 0;

    const onClick = (data) => {
        dispatch(setSelectedShow({ data, collections }));
        navigate('/show-detail');
    }

    const handleDelete = (data) => {
        dispatchCollections(deleteShowCollection({ 
            label: items.label,
            data: data
        }))
        dispatch(setSelectedCollection({
            label: items.label,
            data: collections[items.label]
        }))
    }


    return <div
        css={css`    margin-left: 2.5%; 
    margin-right: 2.5%`}
    >
        <div css={css`
        display:inline-block;
        margin-bottom: 2.5%;
        text-align: center;
        `}>
            <Stack flexDirection="column">
            <h2 css={css`margin:0px;`}>Collection Detail</h2>
            <h1 css={css`text-decoration:underline;margin:0px;margin-bottom:20px;`}>{items.label}</h1>
            </Stack>
        </div>
        <CardList
            data={data}
            dataField={''}
            titleField={'title.english'}
            imageField={'coverImage.large'}
            isDelete
            onDelete={handleDelete}
            onClick={onClick}
        />
        <div css={css`
        display:flex;
        margin:5vh 0;
        flex-direction: row;`}>
            <div css={css`
            flex:6;
            display:flex;
            align-items:center;
            justify-content:center;`}>
                <Pagination
                    count={totalPage}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={(e, page) => { setPage(page) }}
                />
            </div>
            <div css={css`
            flex:6;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:row`}>
                <h4 css={css`
            flex: 6
              font-size: 2em;
              margin: 0 5px;
              font-weight: lighter;
              text-align:center;
              @media (min-width: 60em) {
                  font-size: 1em;
              }`}>
                    Data per page :
                </h4>
                <Select
                    value={perPage}
                    label="PerPage"
                    onChange={(e) => { setPerPage(e.target.value) }}
                >
                    {options.map((value, index) => (
                        <MenuItem
                            key={"perPage" + index}
                            value={value}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    </div>
}
export default CollectionDetailPage