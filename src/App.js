
import MappingUI from './Components/MappingUI';
import StaffList from './Components/StaffList'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './Components/FileUpload';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <ToastContainer />
            <div className="App">

                <header className="App-header">

                    <FileUpload />
                    {/*<MappingUI />
              <StaffList/>*/}

                </header>
            </div>
        </>
    );
}

export default App;
