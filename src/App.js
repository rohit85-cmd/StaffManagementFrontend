
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/Main';

import {Route, Routes } from 'react-router-dom'
import StaffRecords from './Components/StaffRecords';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
    return (
        <div className="App App-header">
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                

                
            </Routes>
        </div>
        
    );
}

export default App;
