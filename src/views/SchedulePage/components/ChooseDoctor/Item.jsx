import { Avatar, Box, Card, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
    p: {
        display: 'box',
        boxOrient: 'vertical',
        overflow: 'hidden',
        lineClamp: 4,
        fontSize: '1rem',
    }
}))

function Item({ doctor, chose }) {
    const classes = styles()

    return (
        <Box maxWidth>
            <Box maxWidth sx={{ p: 1 }}>
                <Box sx={{ border: chose ? '2px solid var(--clr-primary)' : '2px solid var(--clr-line)', borderRadius: 2, display: 'flex', p: 2 }}>
                    <Box>
                        <Avatar
                            alt="Remy Sharp"
                            src={`${process.env.REACT_APP_PATH_API}/avatar/${doctor?.avatar || 'avatar.png'}`}
                            sx={{ width: 80, height: 80 }}
                        />
                    </Box>
                    <Box sx={{ pl: 2 }}>
                        <span>{doctor?.description?.degree}</span>
                        <Typography variant='h6'>{`${doctor?.name?.firstName || ''} ${doctor?.name?.lastName || ''}`}</Typography>
                        <Box>
                            <p className={classes.p}>
                                {doctor?.description?.experience}
                            </p>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box >
    );
}

export default Item;