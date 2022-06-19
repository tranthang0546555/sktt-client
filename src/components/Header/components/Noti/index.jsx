import Notifications from '@mui/icons-material/Notifications';
import { Badge, Box, IconButton, List, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi'
import { useSelector } from 'react-redux'
import ItemNoti from './ItemNoti';
function Noti(props) {

    const accessToken = useSelector(state => state.user.current.accessToken)
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const handleClickNotification = (event) => {
        setAnchorElNotification(event.currentTarget);
    };
    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const openNotification = Boolean(anchorElNotification)

    const [noti, setNoti] = useState([])
    const [isReadNum, setIsReadNum] = useState(0)
    const [read, setRead] = useState(true)
    useEffect(() => {
        getNotification()
    }, [read])
    const getNotification = async () => {
        await userApi.getNotification(accessToken).then(res => {
            console.log(res)
            setNoti(res)

            const isReadList = res.filter((noti) => noti.isread === 1)
            setIsReadNum(isReadList.length)

        }).catch(error => { })
    }

    const handleReadNoti = async (notiId) => {
        await userApi.readNotification(notiId, accessToken).then(res => {
            console.log(res)
            setRead(pre => !pre)
        }).catch(error => { })
    }
    return (
        <Box>
            <IconButton
                sx={{ mr: 2 }}
                // size="large"
                aria-label="show new notifications"
                color="inherit"
                onClick={handleClickNotification}
            >
                <Badge badgeContent={isReadNum} max={999} color="error">
                    <Notifications />
                </Badge>
            </IconButton>
            <Popover
                // id={id}
                open={openNotification}
                anchorEl={anchorElNotification}
                onClose={handleCloseNotification}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ height: '360px', width: '300px', p: 1 }}>
                    {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                    <List
                        sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            '& ul': { padding: 0 },
                        }}
                    >


                        {(noti.length > 0) ? (
                            noti.map((data, index) => {
                                return <ItemNoti data={data} key={index} handleReadNoti={handleReadNoti} />
                            })
                        ) : (
                            <Typography
                                sx={{ display: 'inline' }}
                                variant="h6"
                                color="primary"

                            >
                                Không có thông báo nào

                            </Typography>
                        )}
                    </List>

                </Box>
            </Popover>
        </Box>

    );
}

export default Noti;