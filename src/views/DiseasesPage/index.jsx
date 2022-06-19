import React from 'react';
import { Box, Container } from '@mui/material'
import Post from './components/Post';

function DiseasesPage(props) {

    return (
        <Box sx={{ pt: 3, pb: 3 }}>
            <Container>
                <Post />
            </Container>
        </Box>
    );
}

export default DiseasesPage;