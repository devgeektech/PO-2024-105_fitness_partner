import React, { useState } from "react";
import { Button, Dropdown, Form, Modal, Table } from "react-bootstrap";
import LockIcon from "../../icons/LockIcon";
import "./style.scss";
import SearchIcon from "../../icons/SearchIcon";
import BusinessIcon from "../../icons/BusinessIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import InfoIcon from "../../icons/InfoIcon";
import FilterIcon from "../../icons/FilterIcon";
import CheckInModal from "../../core/components/CheckInModal/page";
import ConfirmModal from "../../core/components/ConfirmModal/page";

export default function CheckIn() {
  const [show, setShow] = useState(false);
  const [showConfirm, setConfirmShow] = useState(false);

  const handleConfirmClose = () => setConfirmShow(false);
  const handleConfirmShow = () => setConfirmShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="CheckIn">
        <div className="container">
          <h3>Check-in</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="bookingBlock">
                <h2>Enter booking unique code</h2>
                <form>
                  <div className="form-group ">
                    <div className="my-5 group-img iconLeft  position-relative">
                      <label>
                        <LockIcon />
                      </label>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Input unique code"
                          className="commonInput"
                        />
                      </Form.Group>
                    </div>
                    <Button className="contniueBtn w-100" onClick={handleConfirmShow}>Continue</Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="bgFormColor my-4">
            <div className="searchTitleWrap d-flex justify-content-between align-items-start">
              <label>Today check-in’s</label>
              <div className="searchWrap d-flex gap-2 align-items-center">
                <form>
                  <button>
                    <SearchIcon />
                  </button>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search check-in ..."
                  />
                </form>
                <div className="filterDropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <FilterIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <button className="active">Date, new to old</button>
                      <button>Date, old to new</button>
                      <button>Alphabetically, A-Z</button>
                      <button>Alphabetically, Z-A</button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table className="tableWrapper">
                <thead>
                  <tr>
                    <th>Class name</th>
                    <th>Booking date time</th>
                    <th>Visitor Name</th>
                    <th>Check-in time</th>
                    <th>Status / Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="underline">Cardio</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Check-in</span>
                        <button onClick={handleShow} className="confirmBtn">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Cardio</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-danger">Cancelled</span>
                        <button onClick={handleShow} className="cancelbtn">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Cardio</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Check-in</span>
                        <button onClick={handleShow} className="cancelbtn">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* modal start */}
        <ConfirmModal show={show} handleClose={handleClose} handleShow={handleShow} />
        <CheckInModal  showConfirm={showConfirm} handleConfirmClose={handleConfirmClose} />
    </>
  );
}
