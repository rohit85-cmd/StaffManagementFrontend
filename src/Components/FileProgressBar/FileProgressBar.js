import React from 'react';
import Button from 'react-bootstrap/Button';



function FileProgressBar(props) {
    const { fileName, fileSize, handleFileSelection } = props;


    const removeFile = (e) => {
        e.preventDefault();
        handleFileSelection(null);
    }

    return (
        <div style={{ backgroundColor: '#e7e7ed', display: 'flex', justifyContent: 'space-around' }}>
            
            <div>
                <i className="bi bi-filetype-csv" style={{ fontSize: 35, color: 'green' }}></i>
            </div>

            <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize:"18px" }}>{fileName}</div>
                <div style={{ fontSize: "14px" }}>{Math.round((fileSize / 1000) * 100) / 100}KB</div>
            </div>

            <div>

                <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none', fontSize:20 }} onClick={removeFile}>
                    <i className="bi bi-x-circle"></i>
                </Button>
            </div>
            
            
            

        </div>
    );
}
export default FileProgressBar;