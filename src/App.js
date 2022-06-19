import { Box } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthDoctor from './auth/AuthDoctor';
import AuthUser from './auth/AuthUser';
import Header from './components/Header';
import { authTokenLogin, logoutUser, reloadUser, saveLogin } from './features/auth/userSlice';
import DiseasesPage from './views/DiseasesPage';
import DetailDiseasePage from './views/DiseasesPage/DetailDiseasePage';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import Main from './views/Main';
import RegisterPage from './views/RegisterPage';
import VideoCall from './views/VideoCall';
import NotFound from './views/NotFound';
import Schedule from './views/SchedulePage';
import DoctorPage from './views/DoctorPage';
import DetailDoctor from './views/DoctorPage/DetailDoctor';
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const accessToken = user.current?.accessToken || null

    const auth = async () => {
      try {
        const action = authTokenLogin({ accessToken })
        const response = await dispatch(action)
        const result = unwrapResult(response)
        console.log("Auth token: ", result)
        setIsLoading(false)

      } catch (error) {
        console.log("Error token: ", error)
        const action = logoutUser()
        dispatch(action)
        setIsLoading(false)
      }
    }
    if (user.settings.isLogin === false && accessToken) {
      auth()
    }
  }, [])

  return isLoading ?
    (
      <></>
    ) :
    (
      <Box minHeight={1200}>
        <Header />
        < Main >
          <Routes>
            <Route path='/chung-benh' element={<DiseasesPage />} />
            <Route path='/chung-benh/:slug' element={<DetailDiseasePage />} />

            <Route path='/bac-si' element={<DoctorPage />} />
            <Route path='/bac-si/:id' element={<DetailDoctor />} />

            <Route path='/dang-nhap' element={<LoginPage />} />
            <Route path='/dang-ky' element={<RegisterPage />} />

            <Route path='/dat-lich' element={<Schedule />} />

            <Route path='/user/*' element={<AuthUser />} />
            <Route path='/doctor/*' element={<AuthDoctor />} />

            <Route path='/phong/:codeRoom' element={<VideoCall />} />

            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </Box >
    )
}

export default App;
