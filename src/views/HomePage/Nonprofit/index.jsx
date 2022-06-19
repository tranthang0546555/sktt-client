import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
const styles = makeStyles(theme => ({
    background: {
        position: 'relative',
        color: '#fff',
        // backgroundImage: `url(${process.env.REACT_APP_PATH_API}/images/Nature-Wallpaper-hinh-nen-thien-nhien-dep.jpg)`,
        backgroundImage: `url(${'https://live.staticflickr.com/4245/35423497105_c40c835482_b.jpg'})`,

        backgroundPosition: 'center',
        backgroundSize: 'cover',
        textAlign: 'center',
    },

    content: {
        height: '100%',
        background: 'rgba(0,0,0,0.3)'
    }
}))
function Nonprofit(props) {
    const classes = styles()
    return (
        <Box className={classes.background} position='relative'>
            <Box className={classes.content}>
                <Container>
                    <Typography variant='h4' sx={{ pt: 5 }}>
                        Hoạt động phi lợi nhuận
                    </Typography>
                    <Typography variant='body2' sx={{ p: 5 }}>
                        Có một sức khỏe tâm thần đồng nghĩa với việc không bị mắc các bệnh về tâm lý, rối loạn tâm thần, và đặc biệt là có một trạng thái thoải mái, tự tin vào bản thân, tự chủ trong hành động, có khả năng nhận biết năng lực của mình để có sự phát triển tốt nhất tạo sự cân bằng giữa các hoạt động sống
                    </Typography>
                </Container>
            </Box>


        </Box>
    );
}

export default Nonprofit;