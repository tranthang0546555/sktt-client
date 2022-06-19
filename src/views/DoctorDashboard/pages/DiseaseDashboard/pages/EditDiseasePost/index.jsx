import React from 'react';
import EditForm from './EditForm';
import diseasePostApi from '../../../../../../api/diseasePostApi'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

function EditDiseasePost(props) {
    const accessToken = useSelector(state => state.user.current?.accessToken)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()



    const onSubmitUpdate = async (data) => {
        console.log(data)
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
            _id: data._id,
            title: data.title,
            description: data.description,
            modeContent: data.modeContent,
            content,
        }

        console.log(data._id)
        await diseasePostApi.editDiseasePost(diseasePost, accessToken).then(res => {
            console.log(res)
            enqueueSnackbar(res.message, { variant: 'success' })
            navigate('/doctor/bai-viet/')
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <EditForm onSubmitUpdate={onSubmitUpdate} />
        </div>
    );
}

export default EditDiseasePost;