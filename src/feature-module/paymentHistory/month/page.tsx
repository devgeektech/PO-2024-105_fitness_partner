import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import "./style.scss";
export default function Month() {
  return (
    <>
      <div className="monthWrapper">
        <div className="container">
          <ul className="breadcrumbWrapper">
            <li>
              <Link to={"#"}>Payments & History</Link>
            </li>{" "}
            /
            <li>
              <span>March 2024</span>
            </li>
          </ul>
          <div className="bgFormColor my-4">
            <div className="searchTitleWrap d-flex justify-content-between align-items-center">
              <label>Upcoming booking</label>
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
                    <th>Check-ins</th>
                    <th>Visitor No-Show</th>
                    <th>Cancelled classes</th>
                    <th>Status / Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="underline">Cardio</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"/paymentHistory/month/history"} className="confirmBtn">
                          History
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Boxing</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"#"} className="confirmBtn">
                          History
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Weight training</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"#"} className="confirmBtn">
                          History
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Swimming</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"#"} className="confirmBtn">
                          History
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Yoga</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"#"} className="confirmBtn">
                          History
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="underline">Zumba</span>
                    </td>
                    <td>45</td>
                    <td>12</td>
                    <td>10</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Link to={"#"} className="confirmBtn">
                          History
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
    </>
  );
}
