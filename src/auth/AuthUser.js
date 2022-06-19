import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../views/UserDashboard';
function AuthUser(props) {
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.user.settings.isLogin)
    const level = useSelector(state => state.user.current?.user?.level || 0)

    console.log('isLogin', isLogin)

    useEffect(() => {
        if (isLogin) {
            if (level !== 1) navigate('/')
        } else {
            navigate('/dang-nhap')
        }
    }, [])

    return (
        <>
            {(isLogin && level === 1) && (
                <UserDashboard />
            )}
        </>
    );
}

export default AuthUser;