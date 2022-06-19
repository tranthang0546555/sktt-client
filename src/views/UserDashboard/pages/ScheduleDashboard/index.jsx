import { Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import date from 'date-and-time'
import { Link } from 'react-router-dom';

const map = {
    today: 'Hôm nay',
    past: 'Trước đó',
    future: 'Sắp tới',
}

function ScheduleDashboard(props) {
    const [schedule, setSchedule] = useState()
    const accessToken = useSelector(state => state.user.current.accessToken)

    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    // console.log('tab', tab)
    useEffect(() => {
        getSchedule()
    }, [])

    const getSchedule = async () => {
        await userApi.getScheduleUser(accessToken).then(res => {
            const sche = res
            const today = sche.filter(data => {
                const timeAt = new Date(data.timeAt.from).toDateString()
                const now = new Date(Date.now()).toDateString()
                if (timeAt === now) return true
                return false
            })

            const otherDays = sche.filter(data => {
                return !today.includes(data)
            })
            const past = otherDays.filter(data => {
                return new Date(data.timeAt.to).getTime() < Date.now()
            })

            const future = otherDays.filter(data => {
                return new Date(data.timeAt.from).getTime() > Date.now()
            })

            const data = {
                today,
                past,
                future
            }
            // console.log("data", data)
            setSchedule(data)
        }).catch(error => { })
    }

    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                        {Object.keys(map).map((key, index) => (
                            <Tab label={map[key]} key={key} />
                        ))}
                    </Tabs>
                </Box>

            </Box>
            <br />

            {schedule && schedule[Object.keys(map)[tab]].map((value, index) => {
                return (
                    <Box key={value._id}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Box sx={{ width: '33%', flexShrink: 0 }}>
                                    <Typography sx={{ color: 'green' }}>
                                        {`${date.format(new Date(value.timeAt.from), 'hh:mm A')} - ${date.format(new Date(value.timeAt.to), 'hh:mm A')}`}
                                    </Typography>
                                    <Typography color='primary' variant='caption'>
                                        {`${date.format(new Date(value.timeAt.from), 'DD/MM/YYYY')}`}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {`${value?.doctor?.name?.firstName} ${value?.doctor?.name?.lastName}`}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {`(${value?.doctor?.description?.degree})`}
                                    </Typography>
                                </Box>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Mã phòng: {value.codeRoom}
                                </Typography>
                                {/* <td onClick={() => window.open('videoCall', "_blank")}>Vào phòng khám tại đây</td> */}
                                <Link to={`/phong/${value.codeRoom}`} target="_blank" rel="noopener noreferrer" >
                                    <h2>Vào phòng khám tại đây</h2>
                                </Link>
                            </AccordionDetails>
                        </Accordion>
                        <br />
                    </Box>
                )
            })}
        </Box>
    );
}

export default ScheduleDashboard;