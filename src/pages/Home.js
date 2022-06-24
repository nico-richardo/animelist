/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Card from "../component/StyledCard"
import { GET_LIST } from "../graphql/Queries";
import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import styled from '@emotion/styled';
import { MenuItem, Pagination, Select } from '@mui/material';
import Loading from './Loading';

function Home(props) {
    let [page, setPage] = useState(1);
    let [perPage, setPerPage] = useState(10);
    const options = [10, 20, 50, 100]

    let { data, loading, error } = useQuery(GET_LIST, {
        variables: { page: page, perPage: perPage },
    });
    const totalPage = data?.Page?.pageInfo?.total ? data.Page.pageInfo.total / perPage : 0;

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

    const CardList = data.Page.media.map((value, index) => {
        return <Card
            key={'card' + index}
            title={value.title.english}
            imgSrc={value.bannerImage}
            data={value}
        />
    });

    const CardListContainer = styled.div` 
        width: 90%;
        height: 100% /* height given for illustration */
        position: relative;
        margin: 0 auto;
        display: grid;
        
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
        
        @media (min-width: 30em) {
          grid-template-columns: 1fr 1fr;
        }
        
        @media (min-width: 60em) {
          grid-template-columns: repeat(5, 1fr);
        }
    `

    return <Fragment>
        <div css={css`
        display:inline-block;
        margin-bottom: 2.5%;
        `}>
            <h1>Shows List</h1>
        </div>
        <CardListContainer>
            {CardList}
        </CardListContainer>
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
export default Home