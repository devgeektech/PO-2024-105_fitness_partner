import React from 'react'
import "./style.scss";
import SearchIcon from '../../icons/SearchIcon';
import { Link } from 'react-router-dom';
import { Dropdown, Nav, Pagination, Tab } from 'react-bootstrap';
import FilterIcon from '../../icons/FilterIcon';
import GamesBlock from '../../core/components/games';
export default function Classes() {

    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12", "Item 13", "Item 14", "Item 15", "Item 16"];

    return (
        <div className='classesWrapper'>
            <div className='container'>
                <div className='search_btn d-flex justify-content-between align-items-center'>
                    <div className='title_search d-flex align-items-center gap-2'>
                        <h2>Classes</h2>
                        <div className='search_wrap position-relative'>
                            <label><SearchIcon /></label>
                            <input type='text' className='form-control' placeholder='Search class ... ' />
                        </div>
                    </div>
                    <Link to={'#'} className='classBtn'><span>+</span>Create new class</Link>
                </div>
                <div className='tab_FilterWrapper'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                        <div className='tab_top_filter d-flex justify-content-between align-items-center mb-4'>
                            <Nav variant="pills" className="tabBtns">
                                <div className='tabBtnInner d-flex gap-2 align-items-center'>
                                    <Nav.Item>
                                        <Nav.Link eventKey="all">All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="active">Active</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="inactive">In-active</Nav.Link>
                                    </Nav.Item>
                                </div>
                            </Nav>
                            <div className='filterDropdown'>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <FilterIcon />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <button className='active'>Date, new to old</button>
                                        <button>Date, old to new</button>
                                        <button>Alphabetically, A-Z</button>
                                        <button>Alphabetically, Z-A</button>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="all">
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {items && items.map((item, index) => {
                                            return <div className='col-md-4 col-sm-6 col-lg-3 mb-4'>
                                                <Link to={'/classes/detail'}>
                                                    <GamesBlock />
                                                </Link>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="active">
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {items && items.map((item, index) => {
                                            return <div className='col-md-4 col-sm-6 col-lg-3 mb-4'>
                                                <Link to={'/classes/detail'}>
                                                    <GamesBlock />
                                                </Link>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="inactive">
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {items && items.map((item, index) => {
                                            return <div className='col-md-4 col-sm-6 col-lg-3 mb-4'>
                                                <Link to={'/classes/detail'}>
                                                    <GamesBlock />
                                                </Link>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                        <div className='paginationWrapper'>
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item active>{1}</Pagination.Item>
                                <Pagination.Item>{2}</Pagination.Item>
                                <Pagination.Item>{3}</Pagination.Item>
                                <Pagination.Ellipsis />
                                <Pagination.Item >{10}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
