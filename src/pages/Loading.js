/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CircularProgress } from "@mui/material"

function Loading(){
    return (
        <div css={css`
        display:flex;
        align-items: center;
        justify-content:center;
        padding:-bottom: 10%;
        margin:auto;
        width: 80vw;
        height:75vh;`}>
            <CircularProgress/>
        </div>
    )
}

export default Loading