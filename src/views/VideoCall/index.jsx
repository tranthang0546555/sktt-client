import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Room from './Room';
import userApi from '../../api/userApi'
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

function VideoCall(props) {
    const [access, setAccess] = useState(false)
    const accessToken = useSelector(state => state.user.current.accessToken)
    const { enqueueSnackbar } = useSnackbar()
    const { codeRoom } = useParams()

    useEffect(() => {
        joinRoom()
    })

    const joinRoom = async () => {
        await userApi.joinRoom(codeRoom, accessToken).then(res => {
            const hasAccess = res.hasAccess
            if (hasAccess) setAccess(true)
            else setAccess(false)

        }).catch(error => {
            console.log(error.response.data.message)
            enqueueSnackbar(error.response.data.message, { variant: 'error' })
        })
    }

    return access ? (
        <Room codeRoom={codeRoom} />
    ) : (
        <Container>
            <Box sx={{ p: 3 }}>
                <Typography variant='h5'>Bạn không có quyền truy cập vào phòng này</Typography>
                <Link to={'/user/lich-hen'}>Trở về trang trước</Link>
            </Box>
        </Container >
    );
}

export default VideoCall;