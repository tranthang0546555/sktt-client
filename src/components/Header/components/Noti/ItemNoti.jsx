import { ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

function ItemNoti({ data, handleReadNoti }) {

    const handleClick = async () => {
        handleReadNoti(data._id)
    }

    return (
        <ListItem divider alignItems="flex-start" onClick={handleClick}>
            <ListItemText
                primary={
                    <Typography
                        sx={{ display: 'inline' }}
                        variant="h6"
                        color={data.isread === 1 ? 'primary' : 'page.primary'}
                    >
                        {data?.title}
                    </Typography>}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color={data.isread === 1 ? 'primary' : 'page.primary'}

                        >
                            {/* Ali Connors */}
                            {data?.description || " — I'll be in your neighborhood doing errands this…"}
                        </Typography>

                    </React.Fragment>
                }
            />
        </ListItem>

    );
}

export default ItemNoti;