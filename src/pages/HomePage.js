/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GET_LIST } from "../graphql/GetList";
import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { MenuItem, Pagination, Select } from '@mui/material';
import Loading from './Loading';
import CardList from '../base_component/CardList';

function HomePage(props) {
    let [page, setPage] = useState(1);
    let [perPage, setPerPage] = useState(10);
    const options = [10, 20, 50, 100]

    let { data, loading, error } = useQuery(GET_LIST, {
        variables: { page: page, perPage: perPage },
    });
    const totalPage = data?.Page?.pageInfo?.total ? Math.ceil(data.Page.pageInfo.total / perPage) : 0;

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

    return <Fragment>
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
          imageField={'bannerImage'}
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
                    onChange={(e,page) => {setPage(page)}}
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
    </Fragment>
}
export default HomePage