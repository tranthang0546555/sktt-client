import { makeStyles } from '@material-ui/core';
import { Box, Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import "./styles.css";
const useStyles = makeStyles((theme) => ({
    formInBanner: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 20,


        '& #containerFormInBanner': {
            // backgroundColor: 'blue',
            height: '100%',
            position: 'relative',



            '& #btnFormInBanner': {
                zIndex: 10,
                position: 'absolute',
                right: '5%',
                top: '50%',
                transform: 'translateY(-50%)',
                height: 'max-content',
                width: 'max-content',
                textAlign: 'center'
            }
        }
    }

}))


function Banner({ banner }) {
    const classes = useStyles()

    const isLogin = useSelector(state => state.user.settings.isLogin)

    const [sliders, setSliders] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        setSliders(banner)
    }, [])

    const handleClick = () => {
        if (isLogin) navigate('/dat-lich')
        else navigate('/dang-nhap')
    }


    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <Box sx={{ position: 'relative', height: '500px', zIndex: -1 }}>
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    {sliders && sliders.map((slider, index) => (
                        <SwiperSlide key={index} style={{ zIndex: -1 }}>
                            <img key={index} src={slider} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>


            <Box className={classes.formInBanner}>

                <Container id='containerFormInBanner'>

                    <Box id='boxFormInBanner'>

                        <Box id='btnFormInBanner'>
                            <Button onClick={handleClick} variant="contained" size="large" color='error'>Đặt lịch khám ngay</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box >

    );
}

export default Banner;