import React, { useEffect, useLayoutEffect, useRef } from 'react';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../features/auth/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Navigate, useNavigate } from 'react-router-dom';
function RegisterPage(props) {
    const ref = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLogin = useSelector(state => state.user.settings.isLogin)

    const onSubmit = async (data) => {
        try {
            const action = registerUser({ email: data.email, password: data.password })
            const response = await dispatch(action)
            const result = unwrapResult(response)
            console.log("Result: ", result)

            navigate('/dang-nhap')

        } catch (error) {
            console.log("Result: ", error)
            ref.current.setErrorField(error.name, error.message)
        }
    }
    return (
        <>
            {isLogin && (
                <Navigate to="/" replace={true} />
            )}

            {!isLogin && (
                <RegisterForm ref={ref} onSubmit={onSubmit} />
            )}
        </>
    );
}

export default RegisterPage;