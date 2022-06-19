import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
const styles = makeStyles(theme => ({
    background: {
        position: 'relative',
        color: '#fff',
        // backgroundImage: `url(${process.env.REACT_APP_PATH_API}/images/Nature-Wallpaper-hinh-nen-thien-nhien-dep.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        textAlign: 'center',
    },

    content: {
        height: '100%',
        background: 'rgba(0,0,0,0.3)'
    }
}))
function Slogan({ slogan }) {
    const classes = styles()
    return (
        <Box className={classes.background} position='relative' sx={{ backgroundImage: `url(${slogan.bg})` }}>
            <Box className={classes.content}>
                <Container>
                    <Typography variant='h4' sx={{ pt: 5 }}>
                        {slogan?.title || 'Hoạt động phi lợi nhuận'}
                    </Typography>
                    <Typography variant='body2' sx={{ p: 5 }}>
                        {slogan?.content || 'Có một sức khỏe tâm thần đồng nghĩa với việc không bị mắc các bệnh về tâm lý, rối loạn tâm thần, và đặc biệt là có một trạng thái thoải mái, tự tin vào bản thân, tự chủ trong hành động, có khả năng nhận biết năng lực của mình để có sự phát triển tốt nhất tạo sự cân bằng giữa các hoạt động sống'}
                    </Typography>
                </Container>
            </Box>


        </Box>
    );
}

export default Slogan;