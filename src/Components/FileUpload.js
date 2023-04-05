import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import UploadUi from './UploadUi/UploadUi';
import FileProgressBar from './FileProgressBar/FileProgressBar';
import ProgressBar from 'react-bootstrap/ProgressBar';

function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [fileState, setFileState] = useState(false)
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isuploading, setIsUploading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(result);
        if (Object.keys(result).length > 0) {
            navigate("/migratedStaff", { state: { result } });
        }

    }, [result, navigate]);
    
    const handleFileSelection = (file) => {
        if (file) {
            setFile(file);
            setFileName(file.name);
            setFileSize(file.size);
            setFileState(!fileState);
            setIsLoading(false);
        } else {
            setFile(null);
            setFileName('');
            setFileSize('');
            setFileState(false);
            setIsLoading(true);
            setIsUploading(false);
        }
    };




    
    
    


    const uploadFile = async (e) => {
        if (file == null) {
            toast.error("No file chosen", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
        }
        
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        

        try {
            setIsUploading(true);
            const response = await axios.post('https://localhost:7096/api/staffAPI/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadPercentage(percentCompleted);
                },
            })
            setResult(response.data);
            console.log(response);

            

            //console.log("Response is ", response.status);
            toast.success('CSV uploaded successfully!', {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
            
            

        }
        catch (error) {
            console.log(error);
            setIsUploading(false); // setting isUploading to false to stop the file upload process
            if (error.response.data) {
                toast.error(error.response.data, {
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                });
            }
           
            


        }
        
    }
    





    return (
        

        < div >
            
            <Card className="text-center" style={{ color: 'black', width:'40rem'}} >
                <Card.Header style={{ backgroundColor: '#e2e2e9', textAlign: 'left', }}><b>Bulk Uploads</b></Card.Header>
                <Card.Body>
                    <Card.Title style={{fontSize:"22px"} }>How to upload</Card.Title>
                    <ol>
                        <li style={{ fontSize: "18px", textAlign: 'left', }}><Card.Text >
                            Download a template from <a href="https://docs.google.com/spreadsheets/d/1J2_qX_iSsQkNIdVt5qaD8HOgePeBCVQLrdhGzBng1R8/edit?usp=sharing" target="_blank" rel="noreferrer">here</a>
                        </Card.Text>
                        </li>
                        <li style={{ fontSize: "18px", textAlign: 'left', }}><Card.Text >
                            Add your data to the template file.
                            <p style={{ color: '#848491', fontSize: '16px' }}>
                                <i>If using Excel, make sure to export or save as a .csv</i>
                            </p>
                        </Card.Text>
                        </li>
                        <li style={{ fontSize: "18px", textAlign: 'left', }}><Card.Text >
                            Upload it below for processing
                        </Card.Text>
                        </li>
                    </ol>
                    <p style={{ fontSize: '16px' }}>Need a hand?
                        <a href="mailto: rohitjindamwar123@gmail.com"> Send an email</a> to our operations team.
                    </p>

                    

                    {isLoading ?
                        <>
                            {/*  Upload UI component */}

                            < UploadUi handleFileSelection={handleFileSelection} />

                            {/*  Upload UI component */}
                        </> :
                        <>
                            {/*  Progress bar UI component */}
                            <FileProgressBar fileName={fileName} fileSize={fileSize} handleFileSelection={handleFileSelection} />
                            
                            {/*  Progress bar UI component */}                        </>}


                    {isuploading ?
                        <div style={{ marginTop: "5px" }}>
                            <ProgressBar
                                striped
                                variant="success"
                                now={uploadPercentage}
                                label={`${uploadPercentage}% completed`}
                            />
                        </div> :
                        <></>
                   }


                </Card.Body>


                <Card.Footer className="text-muted" style={{ textAlign: 'right' }}>
                    <Button variant="primary" onClick={uploadFile}>Upload</Button>
                </Card.Footer>

                
            </Card>
        </div >

       
    );
};

export default FileUpload;
