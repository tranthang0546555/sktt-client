import { Box } from '@mui/material';
import React, { useState } from 'react';
import Banner from './Banner';
import DoctorIntro from './DoctorIntro';
import Intro from './Intro';
import Importance from './Importance';
import Nonprofit from './Nonprofit';
import { useEffect } from 'react';
import getApi from '../../api/getApi';
import Slogan from './Slogan';
import ReceiveEmail from './ReceiveEmail';

function HomePage(props) {
    const [ui, setUI] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUI()
    }, [])
    const getUI = async () => {
        await getApi.getUI().then(res => {
            setUI(res)
            setLoading(false)
            console.log(res)
        }).catch(error => { })
    }
    return loading ? (
        <Box sx={{ backgroundColor: 'red' }}></Box>
    ) : (
        <Box>
            <Banner banner={ui?.banner} />
            <Intro define={ui?.define} count={ui?.count} />
            <Slogan slogan={ui?.slogan1} />
            {/* <Importance /> */}
            <DoctorIntro />
            {/* <Nonprofit /> */}
            <Slogan slogan={ui?.slogan2} />
            <ReceiveEmail />
        </Box>
    );

    // return (
    //     <Box>
    //         <Banner />
    //         <Intro />
    //         <Importance />
    //         <DoctorIntro />
    //         <Nonprofit />
    //     </Box>
    // );
}

export default HomePage;