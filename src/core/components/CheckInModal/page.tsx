import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface CheckInModalProps {
  showConfirm: boolean;
  handleConfirmClose: () => void;
}

export default function CheckInModal({
  showConfirm,
  handleConfirmClose,
}: CheckInModalProps) {
  return (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showConfirm}
      onHide={handleConfirmClose}
      className="confirmModal CheckModal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modalImg">
          <img
            className="w-100"
            src={"/assets/img/tick-animation.gif"}
            alt="modalImage"
          />
        </div>
        <div className="game_content text-center">
          <h2 className="text-center">Your check-in is confirmed</h2>
          <p>Now you can join your class.</p>
          <div className="bgFormColor p-4 my-3">
            <h3 className="text-start">Booking details</h3>
            <div className="bookDetail">
              <ul>
                <li className="d-flex justify-content-between">
                  <label>Full name :</label>
                  <h4>Betty Abbott</h4>
                </li>
                <li className="d-flex justify-content-between">
                  <label>Email id :</label>
                  <h4>betty.abbott@yahoo.com</h4>
                </li>
                <li className="d-flex justify-content-between">
                  <label>Contact :</label>
                  <h4>6655443377</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="w-100 direction-column justify-content-center">
        <Button onClick={handleConfirmClose} className="w-100">
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
