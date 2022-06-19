import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getApi from '../../api/getApi'
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
const styles = makeStyles((theme) => ({
    container: {
        height: '150px',

        '&:hover': {
            cursor: 'pointer',
            border: '2px solid var(--clr-primary)'
        }
    },
    p: {
        display: 'box',
        boxOrient: 'vertical',
        overflow: 'hidden',
        lineClamp: 4,
        fontSize: '1rem',
    }
}))



function DoctorPage(props) {
    const classes = styles()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        getDoctors()
    }, [])

    const getDoctors = async () => {
        await getApi.getDoctors().then(res => {
            setList(res.doctors)
        }).catch(error => { })
    }

    const handleClick = (doctorId) => {
        navigate(`${doctorId}`)
    }

    console.log(list)
    return (
        <Container>
            <Box>
                <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
                    <Typography variant='button'>Tìm kiếm</Typography>
                    <TextField
                        sx={{ pl: 2, minWidth: 400 }}
                        size='small'
                        id='search'
                        placeholder='Thông tin muốn tìm kiếm'
                    />
                </Box>

                <Box display='flex' flexWrap='wrap'>
                    {list && list.map((doctor, index) => {
                        return (
                            <Box key={index} sx={{ width: '50%' }}>
                                <Box maxWidth>
                                    <Box maxWidth sx={{ p: 1 }} onClick={() => handleClick(doctor._id)}>
                                        <Box className={classes.container} sx={{ border: '2px solid var(--clr-line)', borderRadius: 2, display: 'flex', p: 2 }}>
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
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Container>
    );
}

export default DoctorPage;