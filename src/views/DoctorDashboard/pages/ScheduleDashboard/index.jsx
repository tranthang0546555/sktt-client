import { Button } from '@mui/material';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Schedule from './pages/Schedule';
import TimeServing from './pages/TimeServing';

function ScheduleDashboard(props) {
    return (
        <div>
            <Routes>
                <Route path='lich-lam-viec' element={<TimeServing />} />
                <Route path='lich-hen' element={<Schedule />} />
                <Route path='/' element={<Schedule />} />
            </Routes>
        </div>
    );
}

export default ScheduleDashboard;