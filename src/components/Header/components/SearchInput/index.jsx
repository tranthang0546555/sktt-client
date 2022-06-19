import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import getApi from '../../../../api/getApi';
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.only('md')]: {
            width: '20ch',
        },
        [theme.breakpoints.only('xs')]: {
            width: '0ch',
        },
    },
}));

const useStyles = makeStyles(theme => ({
    searchBox: {
        minWidth: '700px',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid var(--clr-line)',
        borderRadius: '10px',
        padding: 2,
    }
}))



function SearchInput(props) {
    const classes = useStyles()

    const navigate = useNavigate()


    const [openSearch, setOpenSearch] = useState(false)
    const [result, setResult] = useState({ diseasePosts: [], doctors: [] })
    const handleOpen = () => {
        setOpenSearch(true)
    }
    const handleClose = () => {
        setOpenSearch(false)
    }

    const debounce = useRef()

    const handleChange = (e) => {
        const input = e.target.value
        if (debounce) clearTimeout(debounce.current)
        debounce.current = setTimeout(() => {
            getSearch(input)
        }, 800)
    }

    const getSearch = async (input) => {
        if (input !== '') {
            await getApi.search(input).then(res => {
                console.log(res)
                setResult(res)
            }).catch(error => { })
        }
    }

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    const handleClickDiseasePost = (slug) => {
        navigate(`/chung-benh/${slug}`)
        handleClose()
    }

    const handleClickDoctor = (id) => {
        navigate(`/bac-si/${id}`)
        handleClose()
    }

    return (
        <Box>
            <Box onClick={handleOpen}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Tìm kiếm ..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <Modal
                open={openSearch}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.searchBox}>
                    <Box display='flex' justifyContent='flex-end'>
                        <div onClick={handleClose}>
                            <CloseIcon fontSize='large' color='primary' />
                        </div>

                    </Box>
                    <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
                        <TextField fullWidth id="standard-basic" label="Tìm kiếm" variant="standard" onChange={handleChange} size='large' />
                    </Box>

                    <Box sx={{ p: 3 }} minHeight={400} maxHeight={400} overflow='auto' >
                        {(result.diseasePosts.length > 0) ? (
                            <Box>
                                <Typography variant='h6' color='primary'>Bài viết</Typography>
                                <List sx={style} component="nav" aria-label="mailbox folders">
                                    {
                                        result.diseasePosts.map((value, index) => {
                                            return (
                                                <div key={value._id} onClick={() => handleClickDiseasePost(value.slug)}>
                                                    <Divider />
                                                    <ListItem button >
                                                        <ListItemText primary={`${value.title}`} />
                                                    </ListItem>
                                                </div>
                                            )
                                        })
                                    }
                                </List>
                                <hr />
                            </Box>
                        ) : (<></>)}


                        {(result.doctors.length > 0) ? (
                            <Box>
                                <Typography variant='h6' color='primary'>Bác sĩ</Typography>
                                <List sx={style} component="nav" aria-label="mailbox folders">
                                    {
                                        result.doctors.map((value, index) => {
                                            return (
                                                <div key={value._id} onClick={() => handleClickDoctor(value._id)}>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt={`Avatar n°${value + 1}`}
                                                                src={`${process.env.REACT_APP_PATH_API}/avatar/${value?.avatar || 'avatar.png'}`}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItem button divider  >
                                                            <ListItemText primary={`${value?.name?.firstName} ${value?.name?.lastName} - ${value?.description?.degree}`} />
                                                        </ListItem>
                                                    </ListItemButton>
                                                </div>
                                            )
                                        })
                                    }
                                </List>
                            </Box>
                        ) : (<></>)}

                        {(result.diseasePosts.length === 0 && result.doctors.length === 0) ? (
                            <Typography variant='h6' color='primary'>Không tìm thấy kết quả tương ứng</Typography>
                        ) : (<></>)}
                    </Box>
                </Box>

            </Modal>
        </Box>

    );
}

export default SearchInput;