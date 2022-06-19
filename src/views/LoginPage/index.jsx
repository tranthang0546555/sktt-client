import { unwrapResult } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/userSlice';
import LoginForm from './LoginForm';
import { useSnackbar } from 'notistack'

function LoginPage(props) {
    const dispatch = useDispatch()
    const ref = useRef()
    const isLogin = useSelector(state => state.user.settings.isLogin)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const email = data.email
            const password = data.password
            const action = loginUser({ email, password })
            const res = await dispatch(action)
            const result = unwrapResult(res)

            enqueueSnackbar(result.message, { variant: 'success' })
            if (data.remember) {
                console.log("thanhcong", result)
            } else {

            }
        } catch (error) {
            console.log("loi", error)
            ref.current.setErrorField(error.name, error.message)
        }

    }
    return (
        <>
            {isLogin && (
                <Navigate to="/" replace={true} />
            )}
            {!isLogin && (
                <LoginForm onSubmit={onSubmit} ref={ref} />
            )}
        </>
    );
}

export default LoginPage;