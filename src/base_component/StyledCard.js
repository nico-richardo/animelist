/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import { Card, CardContent, CardMedia, CardActionArea, Button, CardActions, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

function StyledCard(props) {
    let {
        title,
        imgSrc,
        data,
        isDelete,
        onClick,
        onDelete
    } = props
    const theme = useTheme();

    return <Card
        css={css`
        min-height: 100%;
      display: flex;
      flex-direction: column;
      border-width:2px;
      top: 0;
      background:  rgba(0,0,0,0.1);
      transition: all .1s ease-in;
      position:relative;
      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0,0,0,0.2);
      }
      `}
    >
        <CardActionArea
            onClick={() => onClick && onClick(data)}
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
                background:  rgba(0,0,0,0.1);
                justify-content: space-between;`}>
                <Tooltip title={title}>
                    <h4 css={css`
            flex: 1
              font-size: 2em;
              font-weight:bold;
              text-overflow: ellipsis;
              overflow: hidden; 
              margin: 0;
              height: 1.2em; 
              white-space: nowrap;
              text-align:center;
              @media (min-width: 60em) {
                  font-size: 1em;
              }`}>
                        {title}
                    </h4>
                </Tooltip>
            </CardContent>
        </CardActionArea>
        {isDelete ? <CardActions css={css`justify-content: center;`}>
            <Button variant='contained'
                onClick={() => onDelete && onDelete(data)}
                css={css`
                        background-color:${theme.colors.red};
                        &:hover {
                            background-color:${theme.colors.darkRed};
                        }`}>
                REMOVE
            </Button>
        </CardActions> : null}
    </Card>
};

StyledCard.propTypes = {
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    data: PropTypes.any,
    isDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    onClick: PropTypes.func
}

export default StyledCard
