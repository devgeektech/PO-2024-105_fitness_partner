import React, { useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import ConfirmModal from "../../core/components/ConfirmModal/page";
import "./style.scss";
import { Link } from "react-router-dom";
export default function PaymentHistory() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
  };
  return (
    <>
      <div className="payment-history">
        <div className="container">
          <h3 className="my-4">Payment History</h3>
          <div className="bgFormColor">
            <div className="searchTitleWrap">
              <div className="searchWrap d-flex gap-2 align-items-center">
                <div className="filterDropdown yearFilter">
                  <Dropdown
                    show={isOpen}
                    onToggle={(isOpen) => setIsOpen(isOpen)}
                  >
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {selectedYear}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[
                        "2024",
                        "2023",
                        "2022",
                        "2021",
                        "2020",
                        "2019",
                        "2018",
                        "2017",
                        "2016",
                        "2015",
                      ].map((year) => (
                        <button
                          key={year}
                          className={selectedYear === year ? "active" : ""}
                          onClick={() => {
                            handleSelectYear(year);
                            setIsOpen(false);  }}
                        >
                          {year}
                        </button>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table className="tableWrapper">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Check-ins</th>
                    <th>Visitor No-Show</th>
                    <th>Cancelled classes</th>
                    <th>Total Revenue (in LE)</th>
                    <th>Payment Status / Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="underline">January</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">February</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">March</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">April</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">May</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">June</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">July</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">September</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">October</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">November</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-warning">In-progress</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">December</span>
                    </td>
                    <td>567</td>
                    <td>23</td>
                    <td>10</td>
                    <td>46.84</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-warning">In-progress</span>
                        <Link to={"/paymentHistory/month"} className="confirmBtn">
                          View breakdown
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Start */}
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}
