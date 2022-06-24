/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card, CardContent, CardMedia } from '@mui/material'
import PropTypes from 'prop-types'

function StyledCard(props) {
    let {
        title,
        imgSrc,
        data
    } = props

    return <Card
        css={css`
        min-height: 100%;
      display: flex;
      flex-direction: column;
      border-width:2px;
      top: 0;
      transition: all .1s ease-in;
      position:relative;
      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0,0,0,0.2);
      }
      `}
    >
        <CardMedia
            component="img"
            height="100vw"
            css={css`
        background-size: cover;
        background-position: center center;`}
            image={imgSrc}
            alt="No Image"
        />
        <CardContent css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;`}>
            <h4 css={css`
            flex: 1
              font-size: 2em;
              font-weight:bold;
              margin: 0;
              text-align:center;
              @media (min-width: 60em) {
                  font-size: 1em;
              }`}>
                {title}
            </h4>
        </CardContent>
    </Card>
};

StyledCard.propTypes = {
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    data: PropTypes.any
}

export default StyledCard
