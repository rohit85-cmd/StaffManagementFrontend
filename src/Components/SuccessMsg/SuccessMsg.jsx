import React from 'react';
import './SuccessMsg.css'
import Modal from 'react-bootstrap/Modal';

function SuccessMsg(props) {
    const totalStaff = props.totalStaffCount;
    return (
        <Modal show={props.show} onHide={props.onHide()}>
            <Modal.Header className="custom-modal" closeButton>
                <i class="bi bi-check-circle "></i>

                <Modal.Title className="custom-title"> [{totalStaff }] Staff members added Successfully!
                </Modal.Title>
            </Modal.Header>

        </Modal>
        


    );
}

export default SuccessMsg;