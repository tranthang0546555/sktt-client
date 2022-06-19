import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoctorDashboard from '../views/DoctorDashboard';

function AuthDoctor(props) {
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.user.settings.isLogin)
    const level = useSelector(state => state.user.current?.user?.level)

    useEffect(() => {
        if (isLogin) {
            if (level !== 2) navigate('/')
        } else {
            navigate('/dang-nhap')
        }
    }, [])

    return (
        <>
            {(isLogin && level === 2) && (
                <DoctorDashboard />
            )}
        </>
    );
}

export default AuthDoctor;