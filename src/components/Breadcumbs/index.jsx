import { makeStyles } from '@material-ui/styles';
import { Breadcrumbs, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLocation, Link } from 'react-router-dom'

const styles = makeStyles(theme => ({
    container: {
        padding: '30px 0px 30px 0px',
        backgroundImage: `url(${'https://www.dailyrounds.org/blog/wp-content/uploads/2019/11/doctors.jpg'})`,
        backgroundSize: 'cover'
    }
}))
const breadcrumbsNameMap = {
    '/chung-benh': 'Chứng bệnh',
    '/bac-si': 'Bác sĩ',
    '/phuong-phap-tri-lieu': 'Phương pháp trị liệu',
    '/dang-nhap': 'Đăng nhập',
    '/dang-ky': 'Đăng ký',
    '/user': 'Người dùng',
    '/doctor': 'Bác sĩ',
    '/doctor/bai-viet': 'Bài viết',
    '/doctor/bai-viet/them-bai-viet': 'Thêm bài viết',
    '/doctor/nhom-benh': 'Nhóm bệnh',
    '/doctor/lich-hen': 'Lịch hẹn',
    '/doctor/thong-tin': 'Thông tin',
    '/dat-lich': 'Đặt lịch',
    '/user/thong-tin': 'Thông tin',
    '/user/lich-hen': 'Lịch hẹn',
    '/phong': 'Phòng',
    '/doctor/lich-hen/lich-lam-viec': 'Lịch làm việc'
}

function Breadcumbs(props) {
    const classes = styles()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter(x => x)

    function handleClick(e) {
        e.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <>
            {pathnames.length !== 0 ? (

                <Box className={classes.container}>
                    <Container >
                        <Box role="presentation" >
                            <Breadcrumbs aria-label="breadcrumb" >

                                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography>
                                        Trang chủ
                                    </Typography>
                                </Link>

                                {pathnames.map((value, index) => {
                                    const last = index === pathnames.length - 1
                                    const to = `/${pathnames.slice(0, index + 1).join('/')}`
                                    return last ?
                                        (
                                            <Typography key={index}>{breadcrumbsNameMap[to] || value} </Typography>
                                        ) :
                                        (

                                            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
                                                <Typography key={index}>
                                                    {breadcrumbsNameMap[to] || value}
                                                </Typography>
                                            </Link>
                                        )
                                })}
                            </Breadcrumbs>
                        </Box>
                    </Container>
                </Box>
            ) : (<></>)
            }
        </>
    );
}

export default Breadcumbs;