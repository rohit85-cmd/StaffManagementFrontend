import React from 'react';
import './UploadUi.css';


function UploadUi(props) {
    
    const { handleFileSelection } = props;
    

    const saveFile = (e) => {
        
        handleFileSelection(e.target.files[0]);
    };

    const handleDrop = (e) => {
        
        const file = e.dataTransfer.files[0];
        if (file) {
            saveFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="border-container">
                <input type="file" accept=".csv" id="file-upload" onChange={saveFile} style={{ display: 'none' }} />

                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>

                    <i className="bi bi-upload" style={{ fontSize:35 }}></i>
                    
                </label>
                
                
                
                <p>Drag and drop files here, or <label htmlFor="file-upload" id="file-browser"> browse</label> your computer.</p>

                
            </div>
            
            
        </div>
    );
}

export default UploadUi;