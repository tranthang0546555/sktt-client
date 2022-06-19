import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';
import date from 'date-and-time';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import getApi from '../../../../api/getApi';
const days = {
    'sun': 'Chủ Nhật',
    'mon': 'Thứ Hai',
    'tue': 'Thứ Ba',
    'wed': 'Thứ Tư',
    'thu': 'Thứ Năm',
    'fri': 'Thứ Sáu',
    'sat': 'Thứ Bảy',
}

function ChooseTime({ doctorId, handleChooseTime }) {
    const { enqueueSnackbar } = useSnackbar()

    console.log('day', new Date(Date.now()).getDay())
    const [day, setDate] = useState(new Date(Date.now()).getDay());

    const handleChange = (event, newValue) => {
        setDate(newValue);
    };

    const [week, setWeek] = useState([])
    const [timeServing, setTimeServing] = useState(null)
    const [timeAt, setTimeAt] = useState()


    useEffect(() => {

        createWeek()
        getTimeServing()

    }, [])

    const getTimeServing = async () => {
        await getApi.chooseTime(doctorId).then(res => {
            setTimeServing(res)
            console.log('res', res)
        })
    }
    const createWeek = () => {
        const now = new Date(Date.now());

        const date = now.getDate()
        const day = now.getDay()

        // 0 -> 6: sun -> sat, mon: 1, tue: 2, wed: 3
        const week = []

        for (let i = 0; i < day; i++) {
            week.push(new Date(now.setDate(date - day + i)))
        }

        for (let i = day; i <= 6; i++) {
            week.push(new Date(now.setDate(date - day + i)))
        }
        setWeek(week)
        console.log(week)
    }


    const handleClick = (from, to, timeAt) => {

        if (new Date(from).getTime() > Date.now()) {
            setTimeAt(timeAt)
            handleChooseTime(from, to)
            enqueueSnackbar('OK', { variant: 'success' })
        } else enqueueSnackbar('Thời gian đã qua, vui lòng chọn ngày khác', { variant: 'error' })
    }

    return (

        <Box sx={{ p: 3 }} >
            <Box textAlign='center'>
                <Typography sx={{ pl: 2 }} variant='button'>Đã chọn: </Typography>
                <Typography sx={{ pl: 2, color: 'var(--clr-primary)' }} variant='button'>{`${timeAt || 'Trống'}`} </Typography>
                <hr></hr>
            </Box>
            <Box display='flex'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs orientation='vertical' wrapped='true' value={day} onChange={handleChange} aria-label="basic tabs example">
                        {Object.keys(days).map((key, index) => {
                            let day = ''
                            if (week.length) day = new Date(week[index]).getDate() + '/' + (new Date(week[index]).getMonth() + 1)
                            return <Tab key={key} label={`${days[key]} --- ${day}`} />
                        })}
                    </Tabs>
                </Box>
                <Box sx={{ flex: 1, p: 2 }}>
                    <Box display='flex' flexWrap='wrap' gap={2}>
                        {timeServing && (
                            timeServing[Object.keys(days)[day]].length ? (
                                timeServing[Object.keys(days)[day]].map((value, index) => {

                                    let ddFrom = new Date(value.from).setDate(new Date(week[day]).getDate())
                                    let mmFrom = new Date(ddFrom).setMonth(new Date(week[day]).getMonth())
                                    let yyFrom = new Date(mmFrom).setFullYear(new Date(week[day]).getFullYear())

                                    let ddTo = new Date(value.to).setDate(new Date(week[day]).getDate())
                                    let mmTo = new Date(ddTo).setMonth(new Date(week[day]).getMonth())
                                    let yyTo = new Date(mmTo).setFullYear(new Date(week[day]).getFullYear())

                                    let from = new Date(yyFrom)
                                    let to = new Date(yyTo)

                                    return (
                                        <Chip
                                            key={index}
                                            onClick={() => handleClick(from, to, `${date.format(from, 'hh:mm A')} - ${date.format(to, 'hh:mm A')}`)}
                                            label={`${date.format(from, 'hh:mm A')} - ${date.format(to, 'hh:mm A')}`}
                                            variant="outlined"
                                            color="primary"
                                        />
                                    )
                                })
                            ) : (
                                <Typography variant='h6' color='primary'>Lịch trống</Typography>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>

    );
}

export default ChooseTime;