import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableViewIcon from '@mui/icons-material/TableView';
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { Link, Route, Routes } from 'react-router-dom';
import ProfileDashboard from './pages/ProfileDashboard';
import ScheduleDashboard from './pages/ScheduleDashboard';

function UserDashboard(props) {
    return (
        <Container>
            <Box sx={{ display: 'flex', minHeight: 300 }}>
                <Box sx={{ pr: 2 }}>
                    {/* <Box sx={{ borderRight: '1px solid var(--clr-line)', pr: 2 }}> */}
                    <List>
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
                            <Route path='/lich-hen/*' element={<ScheduleDashboard />} />
                            <Route path='/thong-tin/*' element={<ProfileDashboard />} />
                            <Route path='*' element={<ScheduleDashboard />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default UserDashboard;