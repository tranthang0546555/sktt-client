import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
Footer.propTypes = {

};

function Footer(props) {
    return (
        <Box sx={{ backgroundColor: '#f1f7fd' }}>
            <Container>
                <Box display='flex' sx={{ p: 2, backgroundColor: '#f1f7fd' }} justifyContent='space-between'>
                    <Box sx={{ pl: 2 }}>
                        <h3>© Copyright </h3>
                        <h2>Công ty TNT </h2>
                    </Box>
                    <Box>
                        <Box display='flex' justifyContent='flex-end' sx={{ pr: 2, height: '100%', alignItems: 'flex-end' }} >
                            <FacebookIcon color='primary' fontSize='large' />
                            <TwitterIcon color='primary' fontSize='large' />
                            <LinkedInIcon color='primary' fontSize='large' />
                            <EmailIcon color='primary' fontSize='large' />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;