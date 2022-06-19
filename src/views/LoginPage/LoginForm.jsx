import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Checkbox, FormControlLabel, Link as LinkMUI } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../components/InputField';
import PasswordFiled from '../../components/PasswordField';

const schema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Nhập địa chỉ email'),
    password: yup.string().min(8, 'Lớn hơn 8 ký tự').required('Nhập mật khẩu'),
    remember: yup.boolean(),
}).required()

function LoginForm({ onSubmit }, ref) {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
        resolver: yupResolver(schema)
    })

    const { control, formState: { errors }, setError, register } = form

    const handleSubmit = async (data) => {
        await onSubmit(data)
    }

    useImperativeHandle(ref, () => ({
        setErrorField(name, message) {
            setError(name, { shouldFocus: true, message })
        },
    }))

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Đăng nhập
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <InputField control={control} name='email' label='Địa chỉ email' errors={errors} />
                        <PasswordFiled control={control} name='password' label='Mật khẩu' errors={errors} />
                        <FormControlLabel control={<Checkbox defaultChecked name='remember' {...register('remember')} />} label='Lưu đăng nhập' />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link to="/login">
                                <LinkMUI href="" variant="body2">
                                    Quên mật khẩu
                                </LinkMUI>
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link to="/dang-ky" style={{ color: 'inherit' }}>
                                Chưa có tài khoản? Đăng ký
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default forwardRef(LoginForm)