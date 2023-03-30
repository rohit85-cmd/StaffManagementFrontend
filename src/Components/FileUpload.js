import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MappingUI from './MappingUI';


function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [fileState, setFileState] = useState(false)
    const [csvFields, setCsvFields] = useState([]);
    

    const navigate = useNavigate();

    /*useEffect(() => {
        console.log(csvFields);
        if (csvFields.length > 0) {
            navigate("/mapper", { state: { csvFields, fileName } });
        }
    }, [csvFields, navigate]);
    */
    

    const uploadFile = async (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        try {
            
            const response = await axios.post('https://localhost:7096/api/staffAPI/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setCsvFields(response.data);
            console.log(csvFields);

            //console.log("Response is ", response.status);
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
            {
                (fileType === "text/csv") ?
                    <>
                        
                        <Button variant="primary" type="file" onClick={uploadFile}>Upload</Button>
                        
                    </> :
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
};

export default FileUpload;
