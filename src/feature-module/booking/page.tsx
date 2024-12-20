import React, { useState } from "react";
import "./style.scss";
import { Button, Modal, Table } from "react-bootstrap";
import SearchIcon from "../../icons/SearchIcon";
import BusinessIcon from "../../icons/BusinessIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import InfoIcon from "../../icons/InfoIcon";
import ConfirmModal from "../../core/components/ConfirmModal/page";
export default function Booking() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="bookingWrapper">
        <div className="container">
          <h3>Bookings</h3>
          <div className="bgFormColor p-4 my-4">
            <div className="searchWrap">
              <form>
                <button>
                  <SearchIcon />
                </button>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search booking ... "
                />
              </form>
            </div>
            <div className="table-responsive">
              <Table className="tableWrapper">
                <thead>
                  <tr>
                    <th>Class name</th>
                    <th>Booking date time</th>
                    <th>Visitor Name</th>
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
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
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
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-danger">Cancelled</span>
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
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}
