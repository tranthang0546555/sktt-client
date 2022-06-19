import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { convertToRaw, EditorState } from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { makeStyles } from '@material-ui/core/styles'
import diseaseGroupApi from '../../../../../../api/diseaseGroupApi'

const schema = yup.object({
    title: yup.string().required('Không để trống').min(10, 'Tiêu đề quá ngắn'),
    description: yup.string().required('Không để trống').min(10, 'Mô tả quá ngắn'),
    groupBy: yup.string().required('Không để trống'),
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

function CreateForm({ onSubmitCreate }) {
    const classes = styles()
    const [modeContent, setModeContent] = useState(1)
    const [diseaseGroups, setDiseaseGroups] = useState([])
    const [groupBy, setGroupBy] = useState('')
    const handleChangeGroupBy = (event) => {
        setGroupBy(event.target.value);
    }

    const form = useForm({
        resolver: yupResolver(schema)
    })

    const { register, formState: { errors } } = form

    const onSubmitForm = (data) => {
        const content2 = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        onSubmitCreate({ ...data, modeContent, groupBy: diseaseGroups[groupBy], content2 })
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (state) => {
        setEditorState(state)
    }
    useEffect(() => {
        getDiseaseGroups()
    }, [])

    const getDiseaseGroups = async () => {
        await diseaseGroupApi.getDiseaseGroups().then(res => {
            console.log(res)
            setDiseaseGroups(res)
        }).catch(error => {

        })
    }

    return (
        <Box>
            <form onSubmit={form.handleSubmit(onSubmitForm)}>
                <Box sx={{ minWidth: 300, pt: 2 }}>
                    <FormControl sx={{ minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-label">Thuộc nhóm bệnh </InputLabel>
                        <Select
                            name="groupBy"
                            {...register('groupBy')}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groupBy}
                            label="Thuộc nhóm bệnh"
                            onChange={handleChangeGroupBy}
                        >
                            {diseaseGroups.map((value, index) => (
                                <MenuItem key={index} value={index}>{value.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <br />
                    {errors.groupBy &&
                        <Typography variant='caption' sx={{ color: 'red' }}>{errors.groupBy?.message}</Typography>
                    }
                </Box>


                <Typography sx={{ pt: 2 }} variant='h6'>Tiêu đề</Typography>
                <TextareaAutosize
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



                                {/* <input
                                    // hidden
                                    {...register('content')}
                                    // disabled
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                /> */}

                            </Box>

                        </>
                    )}
                </Box>

                <br />
                <Button type='submit' variant="contained" color="success" >
                    Đăng bài
                </Button>

            </form>
        </Box>

    );
}

export default CreateForm;