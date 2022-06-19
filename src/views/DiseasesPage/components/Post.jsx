import { Box, InputLabel, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import diseasePostApi from '../../../api/diseasePostApi'
import ItemPost from './ItemPost'

function Post(props) {
    let [searchParams, setSearchParams] = useSearchParams();

    const options = {
        'newest': 'Mới nhất',
        'popular': 'Phổ biến',
        'rate': 'Đánh giá',
    }
    const optionsParam = searchParams.get('option')
    const initOptions = Object.keys(options).findIndex(value => value === optionsParam)
    const [option, setOption] = useState((initOptions === -1) ? 0 : initOptions)

    const handleChangeTab = (event, newOption) => {
        setOption(newOption)
    }

    const initNumPage = parseInt(searchParams.get('page')) || 1
    const [numPage, setNumpage] = useState(initNumPage)


    const [page, setPage] = useState(initNumPage)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const [diseasesPost, setDiseasesPost] = useState(null)

    useEffect(() => {
        // console.log({ a: options[option], page })
        setSearchParams({ option: Object.keys(options)[option], page: page })
        getPost()
    }, [option, page])

    const getPost = async () => [
        await diseasePostApi.getDiseasePost(Object.keys(options)[option], page).then(res => {
            // console.log(res)
            setDiseasesPost(res)
            setNumpage(Math.floor(res.countPost / 10) + 1)
        }).catch(error => {
            console.log(error)
        })
    ]
    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ width: '65%' }}>
                <InputLabel id="demo-select-small">
                    Sắp xếp theo
                </InputLabel>
                <Tabs
                    onChange={handleChangeTab}
                    value={option}
                    aria-label="Tabs where selection follows focus"
                    selectionFollowsFocus
                >
                    {/* {options.map((value, index) => (
                        <Tab key={index} label={value} />
                    ))} */}
                    {Object.keys(options).map((key, index) => (
                        <Tab key={index} label={options[key]} />
                    ))}
                </Tabs>
                <Box sx={{ pt: 2 }}>
                    {diseasesPost?.data.map((value, key) => {
                        return <ItemPost key={key} data={value} />
                    })}
                </Box>
                <Box fullWidth sx={{ pt: 3 }}>
                    <Stack spacing={2}>

                        <Pagination count={numPage} color="primary" page={page} onChange={handleChangePage} />
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ width: '35%' }}>
                <InputLabel id="demo-select-small">
                    Câu hỏi mới nhất
                </InputLabel>
                <Typography>Đang cập nhật tính năng</Typography>
                {/* <Box sx={{ pt: 2 }}>
                    {diseasesPost?.data.map((value, key) => {
                        return <ItemPost key={key} data={value} />
                    })}
                </Box> */}
            </Box>
        </Box>
    );
}

export default Post;