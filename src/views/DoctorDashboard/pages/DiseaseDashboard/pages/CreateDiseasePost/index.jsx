import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CreateForm from './CreateForm';
import diseasePostApi from '../../../../../../api/diseasePostApi'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

function CreateDiseasePage(props) {
    const createdBy = useSelector(state => state.user.current.user._id)
    const accessToken = useSelector(state => state.user.current?.accessToken)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const handleNavigateManagePost = () => {
        navigate('/doctor/quan-ly-bai-viet')
    }

    const onSubmitCreate = async (data) => {
        // console.log(data)

        const content = {}
        if (data.modeContent === 1) {
            content.causes = data.causes
            content.symptoms = data.symptoms
            content.subject = data.subject
            content.prevention = data.prevention
            content.treatments = data.treatments
        } else {
            content.editor = data.content2
        }

        const diseasePost = {
            title: data.title,
            description: data.description,
            modeContent: data.modeContent,
            content,
            createdBy,
            groupBy: data.groupBy._id,
            viewCount: 0,
        }

        console.log(diseasePost)
        await diseasePostApi.createDiseasePost(diseasePost, accessToken).then(res => {
            console.log(res)
            enqueueSnackbar(res.message, { variant: 'success' })
            navigate('/doctor/bai-viet/')
        }).catch(error => {
            console.log(error)
        })

    }
    return (
        <Box>
            <Box>
                <Button variant='contained' onClick={handleNavigateManagePost}>Quản lý bài viết</Button>
            </Box>
            <Box sx={{ p: 3 }} maxWidth>

                <Box>
                    <Typography variant='h5'>Viết bài chứng bệnh mới</Typography>
                    <CreateForm onSubmitCreate={onSubmitCreate} />
                </Box>
            </Box>
        </Box>

    );
}

export default CreateDiseasePage;