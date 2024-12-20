import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Dropdown, Table } from "react-bootstrap";
import FilterIcon from "../../../../icons/FilterIcon";
import SearchIcon from "../../../../icons/SearchIcon";
import ConfirmModal from "../../../../core/components/ConfirmModal/page";
export default function History() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Select service");
  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
  };
  return (
    <>
      <div className="historyPage">
        <div className="container">
          <ul className="breadcrumbWrapper">
            <li>
              <Link to={"/paymentHistory/"}>Payments & History</Link>
            </li>{" "}
            /
            <li>
              <Link to={"/paymentHistory/month/"}>March 2024</Link>
            </li>{" "}
            /
            <li>
              <span>History</span>
            </li>
          </ul>
          <div className="bgFormColor my-4">
            <div className="searchTitleWrap d-flex justify-content-between align-items-center">
              <h3 className="d-flex align-items-center justify-content-between gap-2">
                <label>March 2024 - history</label>
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
                      
                    <div className="searchWrap">
                    <form>
                      <button className="search">
                        <SearchIcon />
                      </button>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search check-in ..."
                      />
                    </form>
                    </div>




                      {[
                        "All",
                        "Boxing",
                        "HIT",
                        "Swimming",
                        "Cardio",
                        "Weight training",
                        "Yoga",
                        "Zumba",
                      ].map((year) => (
                        <button
                          key={year}
                          className={selectedYear === year ? "active" : ""}
                          onClick={() => {
                            handleSelectYear(year);
                            setIsOpen(false);
                          }}
                        >
                          {year}
                        </button>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </h3>

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
                    <th>Visitor name</th>
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
                        <span className="text-danger">Cancelled</span>
                        <button onClick={handleShow} className="confirmBtn">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Boxing</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-warning">Not attended</span>
                        <button onClick={handleShow} className="confirmBtn">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Weight training</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
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
                      <span className="underline">Boxing</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
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
                      <span className="underline">Swimming</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
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
                      <span className="underline">Weight training</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>Aug 17, 2024 : 10.05 AM</td>
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
                    <td>Aug 17, 2024 : 10.05 AM</td>
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
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <button onClick={handleShow} className="confirmBtn">
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
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}
