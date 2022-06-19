import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextareaAutosize, Typography } from '@mui/material';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from "yup";
import DiseasePostApi from '../../../../../../api/diseasePostApi';

const schema = yup.object({
    title: yup.string().required('Không để trống').min(10, 'Tiêu đề quá ngắn'),
    description: yup.string().required('Không để trống').min(10, 'Mô tả quá ngắn'),
}).required();

const styles = makeStyles(theme => ({
    textArea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        width: '98%',
    }
}))

function EditForm({ onSubmitUpdate }) {
    const classes = styles()

    const [data, setData] = useState()

    const { slug } = useParams()
    const [modeContent, setModeContent] = useState(1)

    const form = useForm({
        resolver: yupResolver(schema)
    })

    const { register, formState: { errors } } = form

    const onSubmitForm = (d) => {
        const content2 = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        onSubmitUpdate({ ...d, modeContent, content2, _id: data._id })
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (state) => {
        setEditorState(state)
    }
    useEffect(() => {
        getDiseasePost()
    }, [])


    const getDiseasePost = async () => {
        await DiseasePostApi.getDetailDiseasePost(slug).then(res => {
            console.log(res)
            const result = res[0]
            setData(result)
            setModeContent(result.modeContent)
            if (result.modeContent === 2) setEditorState(convert(result.content.editor))
        }).catch(error => { })
    }

    const convert = (html) => {
        const blocksFromHTML = convertFromHTML(html);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        )
        return EditorState.createWithContent(state)
    }

    return (
        <Box>
            <form onSubmit={form.handleSubmit(onSubmitForm)}>

                <Typography sx={{ pt: 2 }} variant='h6'>Tiêu đề</Typography>
                <TextareaAutosize
                    defaultValue={data?.title}
                    {...register('title')}
                    aria-label="minimum height"
                    minRows={2}
                    placeholder="Tiêu đề bài viết"
                    className={classes.textArea}

                />
                {errors.title &&
                    <Typography variant='caption' sx={{ color: 'red' }}>{errors.title?.message}</Typography>
                }


                <Typography sx={{ pt: 2 }} variant='h6'>Mô tả ngắn</Typography>
                <TextareaAutosize
                    defaultValue={data?.description}
                    {...register('description')}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Mô tả ngắn"
                    className={classes.textArea}

                />
                {errors.description &&
                    <Typography variant='caption' sx={{ color: 'red' }}>{errors.description?.message}</Typography>
                }


                <Typography sx={{ pt: 2 }} variant='h6'>Nội dung</Typography>

                <Button variant={modeContent === 1 ? 'contained' : 'outlined'} size={modeContent === 1 ? 'large' : 'medium'} onClick={() => setModeContent(1)}>
                    Mẫu có sẵn
                </Button>

                <Button sx={{ ml: 1 }} variant={modeContent === 2 ? 'contained' : 'outlined'} size={modeContent === 2 ? 'large' : 'medium'} onClick={() => setModeContent(2)}>
                    Tuỳ chỉnh
                </Button>

                <Box minHeight={300} sx={{ pt: 2, pl: 2 }} maxWidth>
                    {modeContent === 1 && (
                        <Box>
                            <Typography sx={{ pt: 2 }} variant='h6'>Nguyên nhân</Typography>
                            <TextareaAutosize
                                defaultValue={data?.content?.causes}
                                {...register('causes')}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Các nguyên nhân gây ra"
                                className={classes.textArea}
                            />
                            {errors.causes &&
                                <Typography variant='caption' sx={{ color: 'red' }}>{errors.causes?.message}</Typography>
                            }



                            <Typography sx={{ pt: 2 }} variant='h6'>Triệu chứng</Typography>
                            <TextareaAutosize
                                defaultValue={data?.content?.symptoms}
                                {...register('symptoms')}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Triệu chứng gặp phải"
                                className={classes.textArea}
                            />
                            {errors.causes &&
                                <Typography variant='caption' sx={{ color: 'red' }}>{errors.symptoms?.message}</Typography>
                            }


                            <Typography sx={{ pt: 2 }} variant='h6'>Đối tượng</Typography>
                            <TextareaAutosize
                                defaultValue={data?.content?.subject}
                                {...register('subject')}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Đối tượng có thể mắc phải"
                                className={classes.textArea}
                            />
                            {errors.causes &&
                                <Typography variant='caption' sx={{ color: 'red' }}>{errors.subject?.message}</Typography>
                            }

                            <Typography sx={{ pt: 2 }} variant='h6'>Phòng ngừa</Typography>
                            <TextareaAutosize
                                defaultValue={data?.content?.prevention}
                                {...register('prevention')}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Cách phòng ngừa"
                                className={classes.textArea}
                            />
                            {errors.causes &&
                                <Typography variant='caption' sx={{ color: 'red' }}>{errors.prevention?.message}</Typography>
                            }



                            <Typography sx={{ pt: 2 }} variant='h6'>Điều trị</Typography>
                            <TextareaAutosize
                                defaultValue={data?.content?.treatments}
                                {...register('treatments')}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Cách điều trị"
                                className={classes.textArea}
                            />
                            {errors.causes &&
                                <Typography variant='caption' sx={{ color: 'red' }}>{errors.treatments?.message}</Typography>
                            }
                        </Box>
                    )}

                    {modeContent === 2 && (
                        <>
                            <Box>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={onEditorStateChange}
                                />

                            </Box>

                        </>
                    )}
                </Box>

                <br />
                <Button type='submit' variant="contained" color="success" >
                    Cập nhật
                </Button>

            </form>
        </Box>

    );
}

export default EditForm;