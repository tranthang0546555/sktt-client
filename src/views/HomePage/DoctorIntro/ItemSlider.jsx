import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = makeStyles(theme => ({
    cardDoctor: {
        backgroundColor: '#FAFAFA',
        '& :hover': {
            cursor: 'pointer'
        }
    },
    description: {
        display: 'box',
        lineClamp: 6,
        boxOrient: 'vertical',
        overflow: 'hidden',
        paddingRight: '10px',
    },

}))
function ItemSlider({ doctor }) {
    const navigate = useNavigate()
    const classes = styles()

    const id = doctor?.id || '/'
    const slug = doctor?.slug || '/'
    const degrees = doctor?.degrees || 'Bác sĩ, Thạc sĩ, Tiến sĩ, Cử nhân'
    const description = doctor?.description?.experience || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas est debitis reprehenderit minima veritatis blanditiis dolorum. Nemo esse culpa ut laudantium repellat, quae sapiente dolore sunt enim amet veniam? Perspiciatis!'

    const name = `${doctor?.name?.firstName || 'Đang cập nhật'} ${doctor?.name?.lastName || ''}`

    const handleClickDoctor = (id) => {
        navigate(`/bac-si/${id}`)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Card className={classes.cardDoctor} onClick={() => handleClickDoctor(doctor?._id)}>
                <CardContent>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 5 }}>
                            <Typography variant='caption' color='#1976D2'>
                                {degrees}
                            </Typography>
                            <Typography variant='h5' paddingBottom={1} color='#554BAF'>
                                {name}
                            </Typography>
                            <Typography className={classes.description}
                            >
                                {description}
                            </Typography>
                            <br />
                            <Typography variant='button' color='#1976D2'>
                                <Link to={id} style={{ textDecoration: 'none' }}>Xem thêm &#62;&#62;</Link>
                            </Typography>

                        </Box>
                        <Box sx={{ flex: 3 }}>
                            <CardMedia
                                // width="100px"
                                component="img"
                                // height="500px"
                                image={`${process.env.REACT_APP_PATH_API}/avatar/${doctor?.avatar || 'avatar.png'}`}
                                alt="Avatar"
                            />
                        </Box>
                    </Box >
                </CardContent>
            </Card >
        </Box >
    );
}

export default ItemSlider; 