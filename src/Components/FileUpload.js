import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MappingUI from './MappingUI';
import StaffRecords from './StaffRecords';
import Loader from './Loader';
import { Form } from 'react-bootstrap';

function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [fileState, setFileState] = useState(false)
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    


    const navigate = useNavigate();

    useEffect(() => {
        console.log(result);
        if (Object.keys(result).length > 0) {
            navigate("/migratedStaff", { state: { result, fileName } });
        }

    }, [result, navigate]);
    
    


    const uploadFile = async (e) => {
        if (file == null) {
            toast.error("No file chosen", {
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
        }
        setIsLoading(true);
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        

        try {

            const response = await axios.post('https://localhost:7096/api/staffAPI/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setResult(response.data);
            console.log(response);

            

            //console.log("Response is ", response.status);
            toast.success('CSV uploaded successfully!', {
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
            setIsLoading(false);   // Hide loading screen
            

        }
        catch (error) {
            console.log(error);
            if (error.response.data) {
                toast.error(error.response.data, {
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                });
            }
            setIsLoading(false);   // Hide loading screen
            


        }
        setFile(null);
    }
    const saveFile = (e) => {
        console.log("hi",e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            setFileType(e.target.files[0].type);
            setFileState(!fileState);
        }
        else {
            setFile(null);

        }
    }






    return (
        <div>
            {isLoading ? <Loader /> :
                <>
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
                    {/*
                      <Form>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Make Id Auto Increment"
                                name="checkbox"

                                
                                onChange={() => { setIsAutoIncrement(!isAutoIncrement); console.log("checkBox:", isAutoIncrement); }}
                            />
                            
                        </Form.Group>
                    </Form>
                    */}
                </>


            }


        </div>
    );
};

export default FileUpload;
