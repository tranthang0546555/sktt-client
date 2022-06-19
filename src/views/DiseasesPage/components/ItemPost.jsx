import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import date from 'date-and-time'
const styles = makeStyles(theme => ({
    name: {
        color: '#337BC6',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
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

    boxTitle: {
        padding: '5px 0 5px 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '90%',
    },

    title: {
        textDecoration: 'none',
        fontSize: '1.2rem',
        color: 'inherit',
        '&:hover': {
            color: '#337BC6',
        },
    },

    viewCount: {
        fontSize: '.8rem',
        color: '#A0A0A0',
        verticalAlign: 'center',
    }

}))
function ItemPost({ data }) {
    const classes = styles()
    return (
        <Box sx={{ borderBottom: '1px solid #d6d6d7', pt: 1, pb: 1 }}>
            <Box display='flex'>
                <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_PATH_API}/avatar/${data?.createdBy[0]?.avatar}`} />
                <Box sx={{ pl: 2, flex: 1 }} maxWidth>
                    <Link to={`/bac-si/${data?.groupBy[0]._id}`} className={classes.name}>{`${data?.createdBy[0]?.name?.firstName} ${data?.createdBy[0]?.name?.lastName}`}</Link>
                    <span className={classes.createdAt}>{date.format(new Date(data?.updatedAt), 'hh:mm A - DD/MM/YYYY')}</span>
                    <Link to={''} className={classes.groupBy}>{data?.groupBy[0]?.name}</Link>

                    <div className={classes.boxTitle}>
                        <span>
                            <Link className={classes.title} to={`/chung-benh/${data?.slug}`} >{data?.title}</Link>
                        </span>
                    </div>
                    <div className={classes.viewCount}>
                        <VisibilityIcon className={classes.viewCount} />
                        <span style={{ padding: '0 15px 0 5px' }}>{data?.viewCount || 0}</span>

                        <ThumbUpIcon className={classes.viewCount} />
                        <span style={{ padding: '0 15px 0 5px' }}>{data?.numLike || 0}</span>


                        <ModeCommentIcon className={classes.viewCount} />
                        <span style={{ padding: '0 15px 0 5px' }}>{data?.comments.length || 0}</span>
                    </div>
                </Box>

            </Box>

        </Box>
    );
}

export default ItemPost;