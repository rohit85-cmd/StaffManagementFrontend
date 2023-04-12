import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UploadUi from './UploadUi/UploadUi';
import FileProgressBar from './FileProgressBar/FileProgressBar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import Modal from 'react-bootstrap/Modal';
import SuccessMsg from './SuccessMsg/SuccessMsg';



function CenteredModal(props) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [fileState, setFileState] = useState(false)
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isuploading, setIsUploading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [errorMsg, setErrorMsg] = useState([]);
    const [isErrorVisibleArray, setIsErrorVisibleArray] = useState([]);

    
    

    

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Array: ", isErrorVisibleArray) 

    }, [isErrorVisibleArray]);
    
    useEffect(() => {
        console.log(result);
        if (Object.keys(result).length > 0) {
            navigate("/", { state: { result } });
        }

    }, [result, navigate]);

    const handleButtonCancel = () => {
        // Update errorMsg and isErrorVisibleArray to empty values
        setErrorMsg([]);
        setIsErrorVisibleArray([]);

        // Call props.onHide
        props.onHide();
    }
    
    const handleFileSelection = (file) => {
        if (file) {
            setFile(file);
            setFileName(file.name);
            setFileSize(file.size);
            setFileState(!fileState);
            setIsLoading(false);
            setErrorMsg([]);

        } else {
            setFile(null);
            setFileName('');
            setFileSize('');
            setFileState(false);
            setIsLoading(true);
            setIsUploading(false);
            setErrorMsg([]);
        }
    };


    const uploadFile = async (e) => {    
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
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
                // Update staffRecords count in Main function
                props.handleStaffRecordsCount(response.data.staffRecords.length);
                props.onSuccess();
                props.onHide(); // Hide the modal once file is successfully uploaded
                //props.handleSuccessShow();

                handleFileSelection(null);
            }
            catch (error) {
                console.log(error);
                setIsUploading(false); // setting isUploading to false to stop the file upload process
                setErrorMsg(error.response.data);
                //setIsErrorVisibleArray(new Array(errorMsg.length).fill(true));
                console.log(errorMsg);

                setIsErrorVisibleArray(new Array(error.response.data.length).fill(true));





            }
        }
        else {
            setErrorMsg(["No file chosen"]);
            setIsErrorVisibleArray(new Array(1).fill(true));
        }
        
    }
    





    return (
        

        < Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            { /*---------------Modal Header ---------------*/ }


            <Modal.Header closeButton onHide={handleButtonCancel}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bulk Upload
                </Modal.Title>
            </Modal.Header>
            {/*---------------Modal Body ---------------*/ }
            <Modal.Body>
                <h4>How to upload</h4>
                <ol>
                    <li style={{ fontSize: "18px", textAlign: 'left', }}>
                        Download a template from <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTU_XBjtp-QTh4f4gwyD1ZTAWaA61GgLAuki05SAvAVPn9mV7kpFpuHt_oRXfluv1ZxHwxzGnrk3z1i/pub?gid=929489215&single=true&output=csv" target="_blank" rel="noreferrer" >here</a>
                    </li>

                    <li style={{ fontSize: "18px", textAlign: 'left', }}>
                        Add your data to the template file.
                        <p style={{ color: '#848491', fontSize: '16px' }}>
                            <i>If using Excel, make sure to export or save as a .csv</i>
                        </p>                   
                    </li>

                    <li style={{ fontSize: "18px", textAlign: 'left', }}>
                        Upload it below for processing
                    </li>
                </ol>
                <p >Need a hand?
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


                {isuploading &&
                    <div style={{ marginTop: "5px" }}>
                        <ProgressBar
                            striped
                            variant="success"
                            now={uploadPercentage}
                            label={`${uploadPercentage}% completed`}
                        />
                    </div>
                }

                <div style={{ marginTop:"8px", maxHeight: "100px", overflowY: "auto" }}>
                    {errorMsg.length > 0 &&
                        errorMsg.map((err, index) => {
                            if (isErrorVisibleArray.length > index && isErrorVisibleArray[index]) {
                                return (
                                    <ErrorMsg
                                        key={index}
                                        index={index}
                                        error={err}
                                        isErrorVisibleArray={isErrorVisibleArray}
                                        setIsErrorVisibleArray={setIsErrorVisibleArray}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                </div>


            </Modal.Body>

            { /*---------------Modal Footer ---------------*/ }


            <Modal.Footer>
                <Button
                    onClick={handleButtonCancel }
                >
                    Cancel
                </Button>
                <Button onClick={uploadFile}>Upload</Button>
            </Modal.Footer>

        </Modal >

       
    );
};

function Main() {
    const [modalShow, setModalShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [isSuccessfulMigration, setIsSuccessfulMigration] = useState(false);
    const [totalStaffCount, setTotalStaffCount] = useState(0);
    

    const handleStaffRecordsCount = (count) => {
        // Do something with the count of staffRecords
        setTotalStaffCount(count);
    }

    return (
        <>   
            {isSuccessfulMigration &&
                <SuccessMsg
                    show={successModalShow}
                    
                    onHide={() => setSuccessModalShow(false)}
                    totalStaffCount={totalStaffCount}
                    
                    
                />
            }
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Bulk Staff Upload 
            </Button>

            <CenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSuccess={() => setIsSuccessfulMigration(true)}
                handleStaffRecordsCount={handleStaffRecordsCount}
                //handleSuccessShow={setSuccessModalShow (true)}
                
                
            />


            
        </>
    );
}

export default Main;
