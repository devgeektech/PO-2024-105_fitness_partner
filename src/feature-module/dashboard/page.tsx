import React, { useState } from 'react'
import ArrowGreenUpIcon from '../../icons/ArrowGreenUpIcon'
import CalendarTodayIcon from '../../icons/CalendarTodayIcon'
import "./style.scss";
import ArrowRedDownIcon from '../../icons/ArrowRedDownIcon';
import { Calendar } from '@fullcalendar/core';
import CalendarWhiteIcon from '../../icons/CalendarWhiteIcon';
import DollorWhiteIcon from '../../icons/DollorWhiteIcon';
import { Dropdown, Table } from 'react-bootstrap';
import FilterIcon from '../../icons/FilterIcon';
import SearchIcon from '../../icons/SearchIcon';
import ConfirmModal from '../../core/components/ConfirmModal/page';
export default function DashboardPage() {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  return (
    <>
      <div className='DashboardPage'>
          <div className='container'>
              <h3 className='my-4'>Dashboard</h3>
              <div className='row'>
                  <div className='col-md-4'>
                      <div className='card'>
                          <div className='left'>
                              <p>Today’s check-in</p>
                              <h2>20</h2>
                              <p className='mb-0'>Yesterday: 18 <ArrowGreenUpIcon/></p>
                          </div>
                          <div className='right'>
                              <span><CalendarTodayIcon/></span>
                          </div>
                      </div>
                  </div>
                  <div className='col-md-4'>
                      <div className='card'>
                          <div className='left'>
                              <p>Monthly check-in</p>
                              <h2>356</h2>
                              <p className='mb-0'>Last month: 368 <ArrowRedDownIcon/></p>
                          </div>
                          <div className='right'>
                              <span><CalendarWhiteIcon/> </span>
                          </div>
                      </div>
                  </div>
                  <div className='col-md-4'>
                      <div className='card'>
                          <div className='left'>
                              <p>Current month revenue</p>
                              <h2>$1200</h2>
                              <p className='mb-0'>Last month: $1160 <ArrowGreenUpIcon/></p>
                          </div>
                          <div className='right'>
                              <span><DollorWhiteIcon/></span>
                          </div>
                      </div>
                  </div>
              </div>
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
                              <span className="text-success">Confirmed</span>
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
                              <span className="text-success">Confirmed</span>
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
      <ConfirmModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    </>
  )
}
