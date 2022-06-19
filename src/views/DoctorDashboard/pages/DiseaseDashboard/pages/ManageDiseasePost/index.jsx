import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../../../../api/userApi';
import ItemPost from '../../components/ItemPost';

function ManageDiseasePost(props) {
    const accessToken = useSelector(state => state.user.current.accessToken)
    const navigate = useNavigate()
    const handleNavigateCreateDiseaseGroup = () => {
        navigate('/doctor/them-bai-viet')
    }
    const [diseasePosts, setDiseasePosts] = useState(null)
    useEffect(() => {
        getDiseasePosts()
    }, [])
    const getDiseasePosts = async () => {
        await userApi.getDiseasePosts(accessToken).then(res => {
            console.log(res)
            setDiseasePosts(res)

        }).catch(error => { })
    }
    return (
        <Box>
            <Box>
                <Button variant='contained' onClick={handleNavigateCreateDiseaseGroup}>Thêm bài viết</Button>
            </Box>

            <Box sx={{ pt: 3 }}>
                <Typography variant='h6'>Danh sách bài viết</Typography>

                <Box sx={{ pt: 2 }}>
                    {diseasePosts && diseasePosts?.map((value, key) => {
                        return <ItemPost key={key} data={value} />
                    })}
                </Box>
            </Box>
        </Box>
    );
}

export default ManageDiseasePost;

