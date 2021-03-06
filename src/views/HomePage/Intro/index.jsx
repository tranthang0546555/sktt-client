import { makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MedicationIcon from '@mui/icons-material/Medication';
import { Box, Card, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import getApi from '../../../api/getApi';

const useStyles = makeStyles(theme => (
    {
        boxIntro: {
            width: '100%',
        },
        intro: {
            position: 'relative',
            display: 'flex',
            marginTop: '-150px',
            paddingBottom: '50px',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px',
            [theme.breakpoints.down("md")]: {
                // backgroundColor: "purple",
                // marginTop: '10px',
            },
            [theme.breakpoints.down("sm")]: {
                // backgroundColor: "blue",
                marginTop: '10px',
            },
            [theme.breakpoints.down("xs")]: {
                // backgroundColor: "red",
                marginTop: '10px',
            },

        },

        slogan: {
            width: '33.33%',
            textAlign: 'left',
            [theme.breakpoints.down("xl")]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down("lg")]: {
                fontSize: '1.8rem',
            },
            [theme.breakpoints.down("md")]: {
                fontSize: '1.6rem',
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: '1.4rem',
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: '1.2rem',
                width: '100%',
            },
        },

        sologanItem: {
            backgroundColor: '#1976D2',
            color: '#fff'
        },

        infor: {
            textAlign: 'center',
            display: 'flex',
            width: '60%',
            flexWrap: 'wrap',
            gap: '10px',
            [theme.breakpoints.down("xs")]: {
                width: '100%',
            },
        },
        inforItem: {
            width: '32%',
            [theme.breakpoints.down("sm")]: {
                width: '100%',
            },
            paddingTop: 20,
            paddingBottom: 20,

        },
        icon: {
            fontSize: 40,
        }
    }
))
function Intro({ define, count }) {
    const classes = useStyles()
    const [num, setNum] = useState(count)

    // useEffect(() => {
    //     getIntro()
    // }, [])
    // const getIntro = async () => {
    //     await getApi.getIntro().then(res => {
    //         setCount(res)
    //         console.log(res)
    //     }).catch(error => { })
    // }
    return (
        <Container>
            <Box className={classes.intro}>
                <Box
                    className={classes.slogan}>
                    <Card className={classes.sologanItem}>
                        <Typography padding={2} variant='h5'>
                            {define?.title || 'S???c kho??? t??m th???n l?? g???'}
                        </Typography>
                        <Typography paddingLeft={2} paddingRight={2}>
                            {define?.content || 'L?? m???t tr???ng th??i c???a s??? kh???e m???nh v?? h???nh ph??c, nh???n th???c r?? ???????c kh??? n??ng c???a m??nh, c?? th??? ?????i ph?? v???i nh???ng c??ng th???ng b??nh th?????ng trong cu???c s???ng, l??m vi???c hi???u qu??? v?? c?? kh??? n??ng ????ng g??p cho c???ng ?????ng.'}
                        </Typography>
                        <Typography padding={2}>
                            {define?.other || 'SKTT l?? h??? th???ng h??? tr??? ch??m s??c s???c kho??? t??m th???n (t??m l??), gi??p ng?????i g???p ph???i c??c ch???ng b???nh t??m l?? t??m l???i ???????c s??? c??n b???ng cho b???n th??n v?? ni???m vui trong cu???c s???ng.'}
                        </Typography>
                    </Card>

                </Box>
                <Box className={classes.infor}>
                    <Card className={classes.inforItem}>
                        <HistoryEduIcon className={classes.icon} color='primary' />

                        <Typography padding={1} variant='h5' sx={{ fontWeight: 1000 }}>
                            {num?.postNum || 333.222}
                        </Typography>
                        <Typography variant='h6'>
                            B??i vi???t
                        </Typography>
                    </Card>

                    <Card className={classes.inforItem}>
                        <AccountCircleIcon className={classes.icon} color='primary' />

                        <Typography padding={1} variant='h5' sx={{ fontWeight: 1000 }}>
                            {num?.userNum || 333.222}
                        </Typography>
                        <Typography variant='h6'>
                            Th??nh vi??n
                        </Typography>
                    </Card>


                    <Card className={classes.inforItem}>
                        <MedicationIcon className={classes.icon} color='primary' />

                        <Typography padding={1} variant='h5' sx={{ fontWeight: 1000 }}>
                            {num?.doctorNum || 333.222}
                        </Typography>
                        <Typography variant='h6'>
                            B??c s??
                        </Typography>
                    </Card>
                </Box>
            </Box>
        </Container >


    );
}

export default Intro;