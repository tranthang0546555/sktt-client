import { Route, Routes } from 'react-router-dom';
import CreatediseasePost from './pages/CreateDiseasePost';
import ManageDiseasePost from './pages/ManageDiseasePost';
import EditDiseasePost from './pages/EditDiseasePost';

function DiseaseDashboard(props) {

    return (
        <Routes>
            <Route path='/them-bai-viet' element={<CreatediseasePost />} />
            <Route path='/quan-ly-bai-viet' element={<ManageDiseasePost />} />
            <Route path='/chinh-sua-bai-viet/:slug' element={<EditDiseasePost />} />
            <Route path='/' element={<ManageDiseasePost />} />
        </Routes>
    );
}

export default DiseaseDashboard;