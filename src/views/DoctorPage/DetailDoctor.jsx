import { Avatar, Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getApi from '../../api/getApi'
import { useParams } from 'react-router-dom'
import date from 'date-and-time'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({

    title: {
        fontSize: '1.4rem',
        color: 'var(--clr-primary)'
    },
    content: {
        fontSize: '1.2rem',
    }
}))
function DetailDoctor(props) {
    const classes = useStyles()
    const [doctor, setDoctor] = useState({})

    const { id } = useParams()

    useEffect(() => {
        getDoctor()
    }, [id])

    const getDoctor = async () => {
        await getApi.getDoctor(id).then(res => {
            console.log(res)
            setDoctor(res)
        }).catch(error => { })
    }
    return (
        <Container >
            <Box display='flex' sx={{ pt: 2 }}>
                <Box width={250}>
                    <Box>
                        <Avatar
                            alt="Remy Sharp"
                            src={`${process.env.REACT_APP_PATH_API}/avatar/${doctor?.avatar || 'avatar.png'}`}
                            sx={{ width: 250, height: 250 }}
                        />
                    </Box>
                    <Box textAlign='center'>
                        <Typography color='var(--clr-primary)' variant='h4'>{`${doctor?.name?.firstName} ${doctor?.name?.lastName}`}</Typography>
                    </Box>
                </Box>
                <Box flex={1}>
                    <Box sx={{ pl: 8 }}>
                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Học vị: &#32;</span>
                            <span className={classes.content}>{doctor?.description?.degree}</span>
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Email: &#32;</span>
                            <span className={classes.content}>{doctor?.email}</span>
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Số điện thoại: &#32;</span>
                            <span className={classes.content}>{doctor?.phone}</span>
                        </Box>

                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Giới tính: &#32;</span>
                            <span className={classes.content}>{(doctor?.gender === 1) ? 'Nam' : 'Nữ' || 'Nam'}</span>
                        </Box>

                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Ngày sinh: &#32;</span>
                            <span className={classes.content}>{date.format(new Date(doctor?.birthday), 'DD/MM/YYYY')}</span>
                        </Box>

                        <Box sx={{ pb: 1 }}>
                            <span className={classes.title}>Địa chỉ: &#32;</span>
                            <span className={classes.content}>{doctor?.description?.address}</span>
                        </Box>
                        <Box>
                            <span className={classes.title}>Kinh nghiệm làm việc: &#32;</span>
                            <span className={classes.content}>{doctor?.description?.experience}</span>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Container>
    );
}

export default DetailDoctor;