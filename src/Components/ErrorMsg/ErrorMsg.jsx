import React, { useState } from 'react';
import './ErrorMsg.css'

function ErrorMsg(props) {
    const [isErrorVisible, setIsErrorVisible] = useState(true);
    const { errorMsg, setErrorMsg } = props;
    //console.log("hi", ErrorMsg);
    const handleClose = () => {
        setIsErrorVisible(false); // Set error message visibility to false when close icon is clicked
        setErrorMsg(null); // Set errorMsg prop to null when close icon is clicked
    };
    return (
        // Rendering error message only if isErrorVisible is true
        isErrorVisible && (
            <div className="error-msg">
                <p>{errorMsg}</p>
                <i className="bi bi-x-circle-fill" onClick={handleClose}></i>
            </div>
        )
    );
}

export default ErrorMsg;