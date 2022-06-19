import { Avatar, Box, Button, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import DiseasePostApi from '../../api/diseasePostApi';
import BackspaceIcon from '@mui/icons-material/Backspace';
import date from 'date-and-time'
const styles = makeStyles(theme => ({
    editer: {
        width: '100%',
        resize: 'none',
        outline: 'none',
        verticalAlign: 'top',
        border: '1px solid var(--clr-line)',
        borderRadius: '3px',
        transition: 'borderColor .1s',
        fontSize: '1rem',
    }
}))


function Comment({ postId, userId, isLogin }) {

    const classes = styles()
    const commentRef = useRef()
    const [comments, setComment] = useState([])

    const { enqueueSnackbar } = useSnackbar()

    const [loadMessage, setLoadMessage] = useState(true)

    useEffect(() => {
        getComment()
    }, [loadMessage])

    const getComment = async () => {
        await DiseasePostApi.getComment(postId).then(res => {
            setComment(res)
        })
    }

    const handlePost = async () => {
        const message = commentRef.current.value
        if (!isLogin) return enqueueSnackbar('Vui lòng đăng nhập để bình luận', { variant: 'info' })

        if (!message) {
            return enqueueSnackbar('Bình luận không để trống', { variant: 'warning' })
        } else {
            await DiseasePostApi.postComment({ commentedBy: userId, message, postId }).then(res => {
                commentRef.current.value = ''
                setLoadMessage(pre => !pre)
                return enqueueSnackbar(res.message, { variant: 'success' })
            }).catch(error => {
                return enqueueSnackbar('Lỗi xảy ra, thử lại sau', { variant: 'error' })
            })
        }
    }

    const handleDelete = async (commentId) => {
        await DiseasePostApi.deleteComment(commentId).then(res => {
            setLoadMessage(pre => !pre)
            enqueueSnackbar(res.message, { variant: 'success' })
        }).catch(error => { })
    }

    return (
        <Box>
            <Typography variant='h6'>Bình luận</Typography>
            <Box display='flex' sx={{ border: '1px solid var(--clr-line)', p: 2 }}>
                <Box sx={{ pr: 1 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56, }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <TextareaAutosize ref={commentRef} className={classes.editer} minRows={5} placeholder='Bình luận của bạn...' required />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                        <Button variant='contained' onClick={handlePost}>Bình luận</Button>
                    </Box>
                </Box>
            </Box>


            {comments.length ? (
                <Box sx={{ pt: 3 }}>
                    {comments.map((value, index) => (
                        <Box key={index} sx={{ border: '1px solid var(--clr-line)', mt: 2, p: 2 }}>
                            <Box display='flex'>
                                <Box sx={{ pr: 1 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 40, height: 40, }}
                                    />
                                </Box>
                                <Box sx={{ pr: 1 }}>
                                    <Typography>{`${value?.commentedBy[0]?.name?.firstName || 'Ẩn danh'} ${value?.commentedBy[0]?.name?.lastName || ''}`}</Typography>

                                    <Typography>{date.format(new Date(value?.createdAt), 'hh:mm A - DD/MM/YYYY')}</Typography>
                                </Box>

                                <Box display='flex' sx={{ justifyContent: 'flex-end', flex: 1 }}>
                                    {(value?.commentedBy[0]._id === userId) ?
                                        (
                                            <BackspaceIcon onClick={() => handleDelete(value._id)} color='error' />
                                        ) :
                                        (
                                            <></>
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box>
                                <p>

                                    {value.message}
                                </p>

                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ pt: 3 }}>
                    <Box sx={{ border: '1px solid var(--clr-line)', p: 2 }}>
                        Chưa có bình luận nào
                    </Box>
                </Box>
            )}

        </Box>
    );
}

export default Comment;