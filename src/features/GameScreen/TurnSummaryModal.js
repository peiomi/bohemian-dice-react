import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const TurnSummaryModal = ({ isOpen, toggle, modalData }) => {
    if (!isOpen || !modalData) return null;

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>{modalData.title}</ModalHeader>
            <ModalBody>
                <p>Turn Score: {modalData.turnScore}</p>
                <p>Total Score: {modalData.totalScore}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Continue</Button>
            </ModalFooter>
        </Modal>
    );
};

export default TurnSummaryModal;