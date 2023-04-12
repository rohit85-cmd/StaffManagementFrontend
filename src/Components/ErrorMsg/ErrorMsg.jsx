import React from 'react';
import './ErrorMsg.css'

function ErrorMsg(props) {
    const { index, error,  isErrorVisibleArray, setIsErrorVisibleArray } = props;

   
    
    const handleClose = () => {
        // Update the isErrorVisibleArray for the specific key
        const updatedIsErrorVisibleArray = [...isErrorVisibleArray];
        updatedIsErrorVisibleArray[index] = false;
        setIsErrorVisibleArray(updatedIsErrorVisibleArray);
        
       
        
    };
    return (
        // Rendering error message only if isErrorVisible is true
        <>

            {console.log("isErrorArray Key:", isErrorVisibleArray[index])}
            {isErrorVisibleArray && isErrorVisibleArray[index] && (
                <div className="error-msg">

                    <i className="column bi bi-info-circle-fill"></i>
                    <p>{console.log(error)} {error}</p>
                    <i className="column bi bi-x-circle" onClick={handleClose}></i>
                </div>

            )}
                
        </>
        
    );
}

export default ErrorMsg;