/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types'
import { Avatar, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction } from '@mui/material';
import getPropByString from '../helpers/getPropByString';
import { Folder, Delete } from '@mui/icons-material';


const SecondaryActionWrapper = ({ ...props }) => <ListItemSecondaryAction {...props} />
SecondaryActionWrapper.muiName = "ListItemSecondaryAction";

function StyledList(props) {
    let {
        data,
        dataField,
        titleField,
        imageField,
        isDelete,
        onClick,
        onDelete
    } = props

    const handleListItemClick = (
        value,
        index,
    ) => {
        onClick && onClick(value, index);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && getPropByString(data, dataField).map((value, index) => {
                return <List
                    key={"list" + value + index}
                    component="nav"
                    aria-label="main mailbox folders"
                    disablePadding
                    css={css`
                            margin-left: 5px;
                        `}
                >
                    <ListItem
                        button
                        onClick={() => handleListItemClick(value, index)}
                    >
                        <ListItemIcon>
                            {getPropByString(value, imageField) ?
                                <Avatar
                                    src={getPropByString(value, imageField)}
                                    variant="rounded"
                                /> : <Folder />}
                        </ListItemIcon>
                        <ListItemText primary={getPropByString(value, titleField)} />
                        <SecondaryActionWrapper>
                            {isDelete ? <IconButton edge="end" aria-label="delete" onClick={() => onDelete(value)}>
                                <Delete />
                            </IconButton> : null}
                        </SecondaryActionWrapper>
                    </ListItem>
                </List>
            })}

        </Box>
    );
}


StyledList.propTypes = {
    data: PropTypes.any,
    dataField: PropTypes.string,
    onClick: PropTypes.func,
    isDelete: PropTypes.bool,
    onDelete: PropTypes.any,
    titleField: PropTypes.string,
    imageField: PropTypes.string
}

export default StyledList;