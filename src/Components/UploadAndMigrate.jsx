import Button from 'react-bootstrap/Button';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadAndMigrate() {
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')

    const [fileState, setFileState] = useState(false)

    const uploadFile = async (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('https://localhost:7096/api/staffAPI/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Response is ", response.status);
            toast.success('CSV uploaded successfully!', {
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data, {
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
        }
    }

    const saveFile = (e) => {
        if (e.target.files[0] !== undefined) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            setFileType(e.target.files[0].type);
            setFileState(true)
        }

    }

    return (
        <div>
            <input type="file" accept=".csv" onChange={saveFile}></input>
            {console.log("FileName", fileName)}

            {
                (fileType === "text/csv") ?
                    <Button variant="primary" type="file" onClick={uploadFile}>Upload</Button> :
                    <>
                        {
                            fileState === false ?
                                <Button variant="primary" disabled>Upload</Button> :
                                <>
                                    <Button variant="primary" disabled>Upload</Button>
                                    <p>Choose CSV/text File Only</p>
                                    
                                    

                                </>
                        }
                    </>
            }

        </div>
    );

}
export default UploadAndMigrate;