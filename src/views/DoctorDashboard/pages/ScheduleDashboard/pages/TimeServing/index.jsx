import { Box, Button, Chip, ListItem, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../../../api/userApi'
import { useSelector } from 'react-redux'
import date from 'date-and-time'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom';
const days = {
    'mon': 'Thứ Hai',
    'tue': 'Thứ Ba',
    'wed': 'Thứ Tư',
    'thu': 'Thứ Năm',
    'fri': 'Thứ Sáu',
    'sat': 'Thứ Bảy',
    'sun': 'Chủ Nhật'
}

function TimeServing(props) {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const accessToken = useSelector(state => state.user.current.accessToken)
    const [from, setFrom] = useState(new Date('2022-06-06T08:00:00.102+07:00'))
    const [to, setTo] = useState(new Date('2022-06-06T08:30:00.102+07:00'))

    const [reload, setReload] = useState(false)
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [timeServing, setTimeServing] = useState({})

    const handleResetTimeServing = async () => {
        const day = Object.keys(days)[value]
        await userApi.resetTimeServing({ day }, accessToken).then(res => {
            enqueueSnackbar(res.message, { variant: 'success' })
            setReload(true)
        }).catch(error => { })
    }


    const handleAddTimeServing = async () => {
        if (from.getTime() < to.getTime()) {
            const day = Object.keys(days)[value]
            const data = { day, from, to }
            await userApi.addTimeServing(data, accessToken).then(res => {
                enqueueSnackbar(res.message, { variant: 'success' })
                setReload(true)
            }).catch(error => { })
        } else {
            enqueueSnackbar('Thời gian chọn không hợp lệ', { variant: 'error' })
        }

    }

    useEffect(() => {
        getTimeServing()
    }, [reload])

    const getTimeServing = async () => {
        await userApi.getTimeServing(accessToken).then(res => {
            setTimeServing(res)
            setReload(false)
        }).catch(error => { })
    }

    const handleClickToSchedule = () => {
        navigate('/doctor/lich-hen')
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button variant='contained' onClick={handleClickToSchedule}>Lịch hẹn</Button>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs wrapped='true' value={value} onChange={handleChange} aria-label="basic tabs example">
                    {Object.keys(days).map((key, index) => (
                        <Tab key={key} label={days[key]} />
                    ))}
                </Tabs>
            </Box>
            <Box sx={{ pt: 3, pb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                        label="Từ"
                        value={from}
                        onChange={(newValue) => {
                            setFrom(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <span>&#32;</span>
                    <MobileTimePicker
                        label="Đến"
                        value={to}
                        onChange={(newValue) => {
                            setTo(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </LocalizationProvider>

            </Box>
            <Button variant='contained' onClick={handleAddTimeServing}>Thêm</Button>
            <Box sx={{ pt: 3, pb: 3 }}>
                <Typography>Các khoảng thời gian</Typography>
                <Stack direction="row" spacing={1}>

                    {timeServing[Object.keys(days)[value]]?.map((value, index) => {
                        const from = date.format(new Date(value.from), 'hh:mm A')
                        const to = date.format(new Date(value.to), 'hh:mm A')
                        return <Chip
                            key={index}
                            label={`${from} - ${to}`}
                            variant="outlined"
                            color="primary"
                        />
                    })}

                </Stack>

            </Box>
            <Button variant='contained' onClick={handleResetTimeServing}>Đặt lại</Button>
        </Box>
    )
}

export default TimeServing;