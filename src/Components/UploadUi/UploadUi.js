import React from 'react';
import './UploadUi.css';


function UploadUi(props) {
    
    const { handleFileSelection } = props;
    

    const selectFile = (e) => {
        
        handleFileSelection(e.target.files[0]);
    };

    function dragOverHandler(e) {
        e.preventDefault();
        console.log("File(s) in drop zone");

    }

    function drop(e) {
        e.preventDefault();
        console.log("File(s) dropped");


        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelection(file);
        }
    }


    return (

        <div className="drop-target" onDrop={drop} onDragOver={dragOverHandler}>
                <input type="file" accept=".csv" id="file-upload" onChange={selectFile} style={{ display: 'none' }} />

                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>

                    <i className="bi bi-upload" style={{ fontSize:35 }}></i>
                    
                </label>
                
                
                
                <p>Drag and drop files here, or <label htmlFor="file-upload" id="file-browser"> browse</label> your computer.</p>
            </div>
        
    );
}

export default UploadUi;