
import MappingUI from './Components/MappingUI';
import StaffList from './Components/StaffList'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadAndMigrate from './Components/UploadAndMigrate';
import { ToastContainer } from 'react-toastify';
import FileUpload from './Components/FileUpload';

import {Route, Routes } from 'react-router-dom'
import StaffRecords from './Components/StaffRecords';


function App() {
    return (
        <div className="App App-header">
            <ToastContainer />
            <Routes>
                <Route path="/" element={<FileUpload />} />
                <Route path="/mapper" element={<MappingUI />} />
                <Route path="/migratedStaff" element={<StaffRecords />} />

                
            </Routes>
        </div>
        
    );
}

export default App;
