import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from "yup";

const styles = makeStyles(theme => ({
    root: {
        "& p": {
            color: 'red',
        },
        '& #upload-photo': {
            opacity: 0,
            position: 'absolute',
            zIndex: -1,
        },

        '& label': {
            color: 'var(--clr-primary)',
        }
    },

    tf: {
        paddingRight: '10px',
        paddingBottom: '10px',
    },

    textArea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        width: '98%',
    }
}))
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
    firstName: yup.string().required('Không để trống'),
    lastName: yup.string().required('Không để trống'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    degree: yup.string().required('Không để trống'),
    address: yup.string().required('Không để trống'),
    experience: yup.string().required('Không để trống')

}).required()

function ProfileForm({ onSubmit, handleChangeAvatar }) {
    const classes = styles()
    const user = useSelector(state => state.user.current?.user)

    const form = useForm({
        resolver: yupResolver(schema)
    })

    const { register, formState: { errors } } = form

    const [value, setValue] = useState(user?.birthday || new Date());
    const handleSubmit = (data) => {
        onSubmit({ ...data, birthday: value, gender })
    }

    const handleChange = (e) => {
        let file = e.target.files[0]
        handleChangeAvatar(file)
    }

    const [gender, setGender] = useState(user?.gender || 0)

    const handleChangeGender = e => {
        setGender(e.target.value)
    }


    console.log("Load")
    return (
        <Box maxWidth className={classes.root}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box sx={{ pb: 4 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={`${process.env.REACT_APP_PATH_API}/avatar/${user.avatar}`}
                        sx={{ width: 100, height: 100 }}
                    />
                    <label htmlFor="upload-photo">Thay đổi ảnh đại diện</label>
                    <input type="file" name="photo" id="upload-photo" onChange={handleChange} />
                </Box>
                <Box display='flex' flexWrap='wrap'>

                    <Box className={classes.tf}>
                        <TextField
                            {...register('firstName')}
                            className={classes.tf}
                            id="outlined-required"
                            label="Tên"
                            defaultValue={user?.name?.firstName || ''}
                            placeholder='Tên của bạn'
                        />
                        <p>{errors.firstName?.message}</p>
                    </Box>

                    <Box className={classes.tf}>
                        <TextField
                            {...register('lastName')}
                            className={classes.tf}
                            id="outlined-required"
                            label="Họ"
                            defaultValue={user?.name?.lastName || ''}
                            placeholder='Họ của bạn'
                        />
                        <p>{errors.lastName?.message}</p>
                    </Box>

                    <Box className={classes.tf}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // defaultValue={1}
                                label="Giới tính"
                                value={gender}
                                onChange={handleChangeGender}
                            >
                                <MenuItem value={0}>Nữ</MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                            </Select>

                        </FormControl>
                        <p>{errors.phone?.message}</p>
                    </Box>


                    <Box className={classes.tf}>
                        <TextField
                            {...register('phone')}
                            className={classes.tf}
                            id="outlined-required"
                            label="Số điện thoại"
                            defaultValue={user?.phone || ''}
                            placeholder='Số điện thoại'
                        />
                        <p>{errors.phone?.message}</p>
                    </Box>

                    <Box className={classes.tf}>
                        <TextField
                            {...register('degree')}
                            className={classes.tf}
                            id="outlined-required"
                            label="Học vị"
                            defaultValue={user?.description?.degree || ''}
                            placeholder='Bác sĩ, Tiến sĩ, ...'
                        />
                        <p>{errors.degree?.message}</p>
                    </Box>

                </Box>
                <Box className={classes.tf}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disableFuture
                            label="Ngày sinh"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <br />
                <Box className={classes.tf}>
                    <TextField
                        {...register('address')}
                        fullWidth
                        className={classes.tf}
                        id="outlined-required"
                        label="Địa chỉ"
                        defaultValue={user?.description?.address || ''}
                        placeholder='Địa chỉ của bạn'
                    />
                    <p>{errors.address?.message}</p>
                </Box>

                <Box maxWidth>
                    <h5>Kinh nghiệm</h5>
                    <TextareaAutosize
                        {...register('experience')}
                        className={classes.textArea}
                        aria-label="minimum height"
                        minRows={5}
                        defaultValue={user?.description?.experience || ''}
                        placeholder="Kinh nghiệm bản thân..."
                    />
                </Box>
                <br />
                <Button variant='contained' type='submit'>Lưu</Button>
            </form >
        </Box >
    );
}

export default ProfileForm;