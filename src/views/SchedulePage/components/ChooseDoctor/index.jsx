import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getApi from '../../../../api/getApi';
import Item from './Item';
function ChooseDoctor({ handleChooseDoctor }) {
    const [list, setList] = useState([{}])

    useEffect(() => {
        getDoctors()
    }, [])

    const getDoctors = async () => {
        await getApi.getDoctors().then(res => {
            setList(res.doctors)

        }).catch(error => { })
    }

    const handleChangeSearch = (e) => {
        console.log(e.target.value)
    }

    const [doctorChose, setDoctorChose] = useState()

    const handleDoctorId = (index) => {
        setDoctorChose(index)
        handleChooseDoctor(list[index]?._id)
    }

    return (
        <Box>
            <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant='button'>Tìm kiếm</Typography>
                <TextField
                    sx={{ pl: 2, minWidth: 400 }}
                    onChange={handleChangeSearch}
                    size='small'
                    id='search'
                    placeholder='Thông tin muốn tìm kiếm'
                />
                <Typography sx={{ pl: 2 }} variant='button'>Đã chọn: </Typography>
                <Typography sx={{ pl: 2, color: 'var(--clr-primary)' }} variant='button'>{`${list[doctorChose]?.name?.firstName || ''} ${list[doctorChose]?.name?.lastName || 'Trống'}`} </Typography>

            </Box>

            <Box display='flex' flexWrap='wrap'>
                {list.map((value, index) => {
                    return (
                        <Box key={index} sx={{ width: '50%' }} onClick={() => handleDoctorId(index)}>
                            <Item doctor={value} chose={(doctorChose === index ? true : false)} />
                        </Box>
                    )
                })}
            </Box>

        </Box>
    );
}

export default ChooseDoctor;