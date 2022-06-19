import React, { useEffect, useState } from 'react';
import diseasePostApi from '../../../api/diseasePostApi'
import { Link, useParams } from 'react-router-dom'
import NotFoundDisease from './NotFoundDisease'
import { Avatar, Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Comment from '../../../components/Comment';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack'
import date from 'date-and-time';

const tableOfContent = {
    'causes': 'Nguyên nhân gây ra',
    'symptoms': 'Triệu chứng gặp phải',
    'subject': 'Đối tượng gặp phải',
    'prevention': 'Cách phòng ngừa',
    'treatments': 'Phương pháp điều trị',
}
const styles = makeStyles(theme => ({
    name: {
        color: '#337BC6',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
        fontSize: '1.2rem',
    },

    createdAt: {
        color: '#A0A0A0',
        paddingLeft: '10px',
    },

    groupBy: {
        marginLeft: '10px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        padding: '0px 10px 5px 10px',
        color: 'inherit',
        '&:hover': {
            opacity: '0.8'
        },
        backgroundColor: '#5488c7',
        borderColor: '#5488c7',
        borderRadius: '5px',
        color: '#fff',
    },

    viewCount: {
        paddingTop: '5px',
        fontSize: '1rem',
        color: '#A0A0A0',
        verticalAlign: 'center',

    },

    hrefContent: {
        paddingTop: '70px',
        marginTop: '-70px',
    },

    title: {
        fontWeight: 700,
        fontSize: '2.2rem',
    },
    content: {
        fontSize: '1rem',
        lineHeight: 1.75,
    },

    tableOfContent: {
        textDecoration: 'none',
        color: 'inherit',
        lineHeight: 1.75,
        fontSize: '1rem',
        fontWeight: 400,
        '&:hover': {
            fontWeight: 700,
            color: 'var(--clr-primary)',
        }
    }

}))

function DetailDiseasePage(props) {
    const classes = styles()
    const { slug } = useParams()
    const [data, setData] = useState({})
    const [notFound, setNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [voted, setVoted] = useState(false)


    const { enqueueSnackbar } = useSnackbar()

    const isLogin = useSelector(state => state.user.settings.isLogin)
    const userId = useSelector(state => state.user.current?.user?._id)

    useEffect(() => {
        getDetailDisease()
    }, [slug])

    const getDetailDisease = async () => {
        await diseasePostApi.getDetailDiseasePost(slug).then(res => {
            // console.log("Thanh cong", res)
            setData(res[0])
            setIsLoading(false)
            setVoted(res[0].likeList.includes(userId))

        }).catch(error => {
            // console.log("Loi", error.response.data.message)
            setNotFound(true)
        })
    }

    const vote = async () => {
        const postId = data?._id
        await diseasePostApi.vote(userId, postId).then(res => {
            console.log(res)
            setVoted(pre => !pre)
            enqueueSnackbar(res.message, { variant: 'success' })
        }).catch(error => { })
    }


    return notFound ? (
        <NotFoundDisease />
    ) : (
        <Container sx={{ p: 3 }}>
            {isLoading ? (
                <>Loading</>
            ) : (
                <Box>
                    <Box>
                        <Box display='flex'>
                            <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Box sx={{ pl: 2 }} maxWidth>
                                <Link to={`/bac-si/${data?.groupBy[0]._id}`} className={classes.name}>{`${data?.createdBy[0].name.firstName} ${data?.createdBy[0].name.lastName}`}</Link>
                                <span className={classes.createdAt}>{date.format(new Date(data?.updatedAt), 'hh:mm A - DD/MM/YYYY')}</span>
                                <Link to={''} className={classes.groupBy}>{data?.groupBy[0].name}</Link>

                                <div className={classes.viewCount}>
                                    <VisibilityIcon className={classes.viewCount} />
                                    <span style={{ padding: '0 15px 0 5px' }}>{data?.viewCount || 0}</span>

                                    <ThumbUpIcon className={classes.viewCount} />
                                    <span style={{ padding: '0 15px 0 5px' }}>{data?.numLike || 0}</span>


                                    <ModeCommentIcon className={classes.viewCount} />
                                    <span style={{ padding: '0 15px 0 5px' }}>{data?.comments.length || 0}</span>
                                </div>
                            </Box>
                            <Box sx={{ pl: 2, flex: 1 }} maxWidth>
                                <Box display='flex' justifyContent='flex-end' columnGap={3}>
                                    <BookmarkAddIcon fontSize='large' color='action' />
                                    <Button onClick={vote}>
                                        {voted && (
                                            <ThumbUpIcon fontSize='large' color='primary' />
                                        )}
                                        {!voted && (
                                            <ThumbUpIcon fontSize='large' color='action' />
                                        )}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex'>
                            <Box sx={{ pr: 2, width: data.modeContent === 1 ? '70%' : '100%' }}>

                                <p id={`_title_`} className={classes.title}>{data.title}</p>
                                <p id={`_description_`} className={classes.title}>Mô tả</p>
                                <p className={classes.content}>{data.description}</p>


                                {/* <p id={`_description_`} className={classes.title}>Mô tả</p> */}
                                {/* <p className={classes.content}>{data.description}</p> */}

                                {(data.modeContent === 1) ? (
                                    <Box>
                                        {Object.keys(tableOfContent).map((key, index) => (
                                            <div className={classes.hrefContent} key={`_${key}`} id={`_${key}_${index}`}>
                                                <p className={classes.title}>{tableOfContent[key]}</p>
                                                <p className={classes.content}>{data.content[key]}</p>
                                            </div>
                                        ))}
                                    </Box>
                                ) : (
                                    <Box>
                                        <div style={{ lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: data.content.editor }} />
                                    </Box>
                                )}
                            </Box>
                            {(data.modeContent === 1) && (
                                <Box sx={{ pl: 2, width: '30%' }}>
                                    <h2>Mục lục</h2>
                                    <ul style={{ listStyle: 'none' }}>

                                        {Object.keys(tableOfContent).map((key, index) => (
                                            <li key={`${key}_`}>
                                                <a className={classes.tableOfContent} href={`#_${key}_${index}`}>{`${index + 1} . `}{tableOfContent[key]}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            )}

                        </Box>

                    </Box>
                    <Comment postId={data._id} userId={userId} isLogin={isLogin} />
                </Box>
            )}


        </Container>
    );
}

export default DetailDiseasePage;