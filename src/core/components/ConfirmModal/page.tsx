import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BusinessIcon from "../../../icons/BusinessIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import InfoIcon from "../../../icons/InfoIcon";

interface ConfirmModalProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

export default function ConfirmModal({
  show,
  handleClose,
  handleShow,
}: ConfirmModalProps) {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className="confirmModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalImg">
          <img
            className="w-100"
            src={"/assets/img/modalImage.jpg"}
            alt="modalImage"
          />
        </div>
        <div className="game_content">
          <label>
            <BusinessIcon /> <span className="underline">ID Yoga - FiDi</span>
          </label>
          <h2>Cardio</h2>
          <label className="dateWrap">
            <CalendarIcon />
            Aug 17, 2024 : 10 AM{" "}
          </label>
          <div className="bgFormColor p-4 my-3">
            <h3>Booking person details</h3>
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
        <Button onClick={handleShow} className="w-100">
          Check-in
        </Button>
        {<p className="d-flex align-items-center gap-1">
          <InfoIcon />
          Note: You can cancel the class before 1 hours of the booking time.
        </p>}
        <div className="dangerCancel d-flex align-items-center border-danger border">
          <label className="mb-0 p-2">This booking has been cancelled.</label>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
