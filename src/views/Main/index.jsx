import { Box, Container, TabScrollButton } from '@mui/material';
import React from 'react';
import Breadcumbs from '../../components/Breadcumbs';
import ScrollTop from '../../components/ScrollTop';
function Main(props) {
    return (
        <Box minHeight='1080px'>
            <Breadcumbs />

            {props.children}
            {/* {props.children} */}
            {/* <Container>
                {props.children}
            </Container> */}
            <ScrollTop />
        </Box>
    );
}

export default Main;