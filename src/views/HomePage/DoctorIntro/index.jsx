import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemSlider from './ItemSlider';
import "./styles.css";

import getApi from '../../../api/getApi'

const styles = makeStyles(theme => ({
    parent: {
        width: '100%',
        textAlign: 'left',
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '20px',
    },
    child: {
        width: '49%',
    }

}))

function DoctorIntro(props) {
    const classes = styles()

    const [slider, setSlider] = useState({})


    const handleList = (list) => {
        const slider = {}
        const limit = 4
        const sliderNum = Math.ceil(list.length / limit)

        for (let i = 0; i < sliderNum; i++) {
            slider[i] = [list[i * limit], list[i * limit + 1], list[i * limit + 2], list[i * limit + 3]]
        }
        return slider
    }
    useEffect(() => {
        getDoctors()
    }, [])
    const getDoctors = async () => {
        await getApi.getDoctors().then(res => {
            setSlider(handleList(res.doctors))
            // console.log(res.doctors)
        }).catch(error => { })
    }


    return (
        <Box sx={{ backgroundColor: '#fff', pt: 3, pb: 3 }} >
            <Container>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 7, }}>
                        <Typography variant='h5' color='primary'>
                            Đội ngũ bác sĩ tâm lý chuyên nghiệp
                        </Typography>
                        Quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng được đào tạo bài bản đến chuyên sâu tại Việt nam và nhiều nước có nên y học phát triển như Mỹ, Anh, Pháp... Luôn lấy người bệnh là trung tâm, Vinmec cam kết mang lại dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao cho khách hàng.
                    </Box>

                    <Box sx={{ flex: 3, p: 3 }}>
                        <Typography variant='button'>
                            <Link to='/bac-si' style={{ textDecoration: 'none' }}>Tìm kiếm bác sĩ &#62;&#62;</Link>
                        </Typography>

                    </Box>
                </Box>
                <Swiper className="mySwiper"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {Object.keys(slider).map((key, index) => (
                        <SwiperSlide key={key}>
                            <Box className={classes.parent}>
                                {slider[key].map((doctor, index) => {
                                    return doctor && (
                                        <Box className={classes.child} key={doctor?._id || index}>
                                            <ItemSlider doctor={doctor} />
                                        </Box>
                                    )
                                })}
                            </Box>
                        </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                        <Box className={classes.parent}>
                            <Box className={classes.child}>
                                <ItemSlider />
                            </Box>
                            <Box className={classes.child}>
                                <ItemSlider />
                            </Box>
                            <Box className={classes.child}>
                                <ItemSlider />
                            </Box>
                            <Box className={classes.child}>
                                <ItemSlider />
                            </Box>
                        </Box>
                    </SwiperSlide> */}
                </Swiper>
            </Container>
        </Box >

    );
}

export default DoctorIntro;