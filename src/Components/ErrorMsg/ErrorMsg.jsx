import React from 'react';
import './ErrorMsg.css'

function ErrorMsg(props) {
    const { error  } = props;

   
  
    return (
        // Rendering error message only if isErrorVisible is true
        <>

          
                <div className="error-msg">

                    <i className="column bi bi-info-circle-fill"></i>
                    <p>{console.log(error)} {error}</p>
                    
                </div>

         
                
        </>
        
    );
}

export default ErrorMsg;