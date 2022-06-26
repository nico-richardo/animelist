/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GET_LIST } from "../graphql/GetList";
import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { MenuItem, Pagination, Select } from '@mui/material';
import Loading from '../component/Loading';
import CardList from '../base_component/CardList';
import { addShowCollection, useCollectionContext } from '../contexts/CollectionContext';
import { setSelectedShow, useSelectedShowContext } from '../contexts/SelectedShowContext';
import { useNavigate } from 'react-router-dom'

const HomePage = (props) => {
    const options = [10, 20, 50, 100];
    let [page, setPage] = useState(1);
    let [perPage, setPerPage] = useState(10);
    let { items: collections } = useCollectionContext();
    let { items, dispatch } = useSelectedShowContext();
    let navigate = useNavigate();

    let { data, loading, error } = useQuery(GET_LIST, {
        variables: { page: page, perPage: perPage },
    });
    const totalPage = data?.Page?.pageInfo?.total ? Math.ceil(data.Page.pageInfo.total / perPage) : 0;

    const onClick = (data) => {
        // this one is for adding to selected show
        //let [ arrNewCollection, setArrNewCollection] = useState([]);
        // dispatch(addShowCollection({
        //     arrNewCollection: arrNewCollection,
        //     data: data
        // }));
        dispatch(setSelectedShow({ data, collections }));
        console.log(items)
        navigate('/show-detail');
    }


    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div>
                ERROR
            </div>
        )
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
            <h1>Shows List</h1>
        </div>
        <CardList
            data={data}
            dataField={'Page.media'}
            titleField={'title.english'}
            imageField={'coverImage.large'}
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
export default HomePage