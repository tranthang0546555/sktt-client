import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TableViewIcon from '@mui/icons-material/TableView';
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import DiseaseDashboard from './pages/DiseaseDashboard';
import DiseaseGroupDashboard from './pages/DiseaseGroupDashboard';
import ProfileDashboard from './pages/ProfileDashboard';
import ScheduleDashboard from './pages/ScheduleDashboard';

// const maps = {
//     'bai-viet': 'Bài viết',
//     'nhom-benh': 'Nhóm bệnh',
//     'lich-hen': 'Lịch hẹn',
//     'thong-tin': 'Thông tin',
// }

function DoctorDashboard(props) {
    return (
        <Container>
            <Box sx={{ display: 'flex', minHeight: 300 }}>
                <Box sx={{ pr: 2 }}>
                    {/* <Box sx={{ borderRight: '1px solid var(--clr-line)', pr: 2 }}> */}
                    <List>
                        <Link to={'bai-viet'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Bài viết'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/* <Link to={'nhom-benh'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TableViewIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Nhóm bệnh'} />
                                </ListItemButton>
                            </ListItem>
                        </Link> */}
                        <Link to={'lich-hen'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccessTimeFilledIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Lịch hẹn'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={'thong-tin'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Thông tin'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Box>
                <Box sx={{ flex: 1, pt: 2 }} maxWidth>
                    <Box>
                        <Routes>
                            <Route path='/bai-viet/*' element={<DiseaseDashboard />} />
                            <Route path='/nhom-benh/*' element={<DiseaseGroupDashboard />} />
                            <Route path='/lich-hen/*' element={<ScheduleDashboard />} />
                            <Route path='/thong-tin/*' element={<ProfileDashboard />} />
                            <Route path='*' element={<DiseaseDashboard />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}

export default DoctorDashboard;