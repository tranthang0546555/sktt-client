import MenuIcon from '@mui/icons-material/Menu';
import Notifications from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Popover, Toolbar, Typography, ListItemIcon, Divider } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchInput from './components/SearchInput';
import Logout from '@mui/icons-material/Logout';
import { logoutUser } from '../../features/auth/userSlice'
import { useDispatch } from 'react-redux'
import Noti from './components/Noti';
const pages = ['Trang chủ', 'Chứng bệnh', 'Bác sĩ', 'Phương pháp trị liệu']

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.user.settings.isLogin)
    const user = useSelector(state => state.user.current?.user)
    const level = useSelector((state) => state.user.current?.user?.level || 0)

    const [anchorElPagesResponsive, setAnchorElPagesResponsive] = useState(null);
    const handleClickPagesResponsive = (event) => {
        setAnchorElPagesResponsive(event.currentTarget);
    };
    const handleClosePagesResponsive = () => {
        setAnchorElPagesResponsive(null);
    };
    const openPagesResponsive = Boolean(anchorElPagesResponsive);

    const [anchorElProfile, setAnchorElProfile] = useState(null)
    const handleClickProfile = (event) => {
        setAnchorElProfile(event.currentTarget)
    }
    const handleCloseProfile = () => {
        setAnchorElProfile(null)
    }

    const openProfile = Boolean(anchorElProfile)

    const handleClickLogin = () => {
        return navigate('/dang-nhap')
    }
    const handleClickRegister = () => {
        return navigate('/dang-ky')
    }

    const handleClickHome = () => {
        return navigate('/')
    }
    const handleClockLogout = () => {
        const action = logoutUser()
        dispatch(action)
        return navigate('/')
    }

    const handleClickMenu = (index) => {
        setAnchorElPagesResponsive(null);
        switch (index) {
            case 0: return navigate('/')
            case 1: return navigate('/chung-benh')
            case 2: return navigate('/bac-si')
            case 3: return navigate('/phuong-phap-tri-lieu')
            default: return navigate('/')
        }
    }

    const handleClickManage = () => {
        switch (level) {
            case 0: navigate('/'); break;
            case 1: navigate('/user'); break;
            case 2: navigate('/doctor'); break;
            case 3: navigate('/admin'); break;
            default: navigate('/'); break;
        }
    }

    return (
        <div style={{ height: '64px' }}>
            <AppBar>
                <Container>
                    <Toolbar disableGutters>
                        <Box sx={{ pr: 1, display: { xs: 'none', md: 'flex' } }} onClick={handleClickHome}>
                            <img width='auto' height='50px' src={process.env.REACT_APP_LOGO} />
                        </Box>

                        {/* <Typography
                            onClick={handleClickHome}
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
                        >
                            SỨC KHOẺ TÂM THẦN
                        </Typography> */}

                        <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, pl: 3 }}>
                            {pages.map((page, index) => (
                                <Button key={page} onClick={() => handleClickMenu(index)}
                                    sx={{ color: 'white', pr: 2 }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleClickPagesResponsive}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElPagesResponsive}
                                open={openPagesResponsive}
                                onClose={handleClosePagesResponsive}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem onClick={() => handleClickMenu(index)} key={index}>
                                        <Typography textAlign="right">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ pr: 1, display: { xs: 'flex', md: 'none' } }} onClick={handleClickHome}>
                            <img width='auto' height='40px' src={process.env.REACT_APP_LOGO} />
                        </Box>

                        <Typography
                            onClick={handleClickHome}
                            variant='h8'
                            noWrap
                            component='div'
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            TLSK
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                            <SearchInput />
                            {!isLogin && (
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={handleClickRegister}
                                    >
                                        Đăng ký
                                    </Button>
                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={handleClickLogin}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Box>
                            )}

                            {isLogin && (
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                                    <Noti />

                                    <IconButton sx={{ p: 0 }} onClick={handleClickProfile}>
                                        <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_PATH_API}/avatar/${user.avatar}`} />
                                    </IconButton>
                                </Box>
                            )}

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Menu
                anchorEl={anchorElProfile}
                id="profile-menu"
                open={openProfile}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClickManage}>
                    <Avatar /> Quản lý
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClockLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </div >

    );
};

export default Header;



