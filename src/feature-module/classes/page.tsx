import React, { useEffect, useState } from 'react'
import "./style.scss";
import SearchIcon from '../../icons/SearchIcon';
import { Link } from 'react-router-dom';
import { Dropdown, Nav, Pagination, Tab } from 'react-bootstrap';
import FilterIcon from '../../icons/FilterIcon';
import ClassesCard from '../../core/components/classesCard';
import { getClasslist } from '../../services/classes.service';


export default function Classes() {
    const locationId = localStorage.getItem('locationId') || '';
    const [servicelist, setClasslist] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const tabs = [
        {
            eventKey: "all",
            label: "All",
            filterCondition: () => true, // Show all items
        },
        {
            eventKey: "active",
            label: "Active",
            filterCondition: (item: any) => item.status === "active", // Show active items
        },
        {
            eventKey: "inactive",
            label: "In-active",
            filterCondition: (item: any) => item.status === "inactive", // Show inactive items
        },
    ];

    useEffect(() => {
        getClasses();
    }, []);
    const getClasses = async () => {
        try {
            const payload = { locationId };
            const result = await getClasslist(payload);
            setClasslist(result?.data?.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    // Filter servicelist based on searchTerm
    const filteredServices = servicelist.filter((service) =>
        service?.className?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filteredServices ========= ", filteredServices);

    return (
        <div className='classesWrapper'>
            <div className='container'>
                <div className='search_btn d-flex justify-content-between align-items-center'>
                    <div className='title_search d-flex align-items-center gap-2'>
                        <h2>Classes</h2>
                        <div className='search_wrap position-relative'>
                            <label><SearchIcon /></label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Search class ... '
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Link to={'#'} className='classBtn'><span>+</span>Create new class</Link>
                </div>

                <div className='tab_FilterWrapper'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                        <div className='tab_top_filter d-flex justify-content-between align-items-center mb-4'>
                            <Nav variant="pills" className="tabBtns">
                                <div className='tabBtnInner d-flex gap-2 align-items-center'>
                                    {tabs.map((tab) => (
                                        <Nav.Item key={tab.eventKey}>
                                            <Nav.Link eventKey={tab.eventKey}>{tab.label}</Nav.Link>
                                        </Nav.Item>
                                    ))}
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
                            {tabs.map((tab) => (
                                <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            {filteredServices && 
                                            filteredServices.filter(tab.filterCondition).map((item, index) => {
                                                return <div className='col-md-4 col-sm-6 col-lg-3 mb-4' key={index} >
                                                    <Link to={'/classes/detail'}>
                                                        <ClassesCard
                                                            className={item.className}
                                                            image={item.images[0]}
                                                            status={item.status}
                                                            classType={item.classType}
                                                            participants={item.participants}
                                                        />
                                                    </Link>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </Tab.Pane>
                            ))}
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
