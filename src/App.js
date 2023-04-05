
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Main from './Components/FileUpload';
import {Route, Routes } from 'react-router-dom'
import StaffRecords from './Components/StaffRecords';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
    return (
        <div className="App App-header">
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Main />} />
                
                <Route path="/migratedStaff" element={<StaffRecords />} />

                
            </Routes>
        </div>
        
    );
}

export default App;
