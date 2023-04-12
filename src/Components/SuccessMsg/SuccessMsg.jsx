import React, { useState,useEffect } from 'react';
import './SuccessMsg.css'
import Modal from 'react-bootstrap/Modal';

function SuccessMsg(props) {
    //console.log("props: ",props);
    const [show, setShow] = useState(true);
    const totalStaff = props.totalStaffCount;
    const handleClose = () => { setShow(false) }


    
    return (

        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="custom-modal" closeButton>
                <i class="bi bi-check-circle "></i>

                <Modal.Title className="custom-title"> [{totalStaff }] Staff members added Successfully!
                    </Modal.Title>
                </Modal.Header>

            </Modal>
        


    );
}

export default SuccessMsg;