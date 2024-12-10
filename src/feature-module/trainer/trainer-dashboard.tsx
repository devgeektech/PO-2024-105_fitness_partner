import React, { useEffect, useState } from "react";
import { LANG } from "../../constants/language";
import { Dropdown, Form } from "react-bootstrap";
import EditIcon from "../../icons/EditIcon";
import MembershipIcon from "../../icons/MembershipIcon";
import GroupUsersIcon from "../../icons/GroupUsersIcon";
import DoubleUserIcon from "../../icons/DoubleUserIcon";
import "./style/style.scss"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUserById } from "../../services/user.service";
import { setUserDetail } from "../../core/data/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { getMyFriends } from "../../services/friends.service";
import TrainerTab from "./tabs/page";
import { getAllTeamMembers } from "../../services/teams.service";
import CalendarIcon from "../../icons/CalendarIcon";
import { getAllMyUpcommingEvents } from "../../services/event.service";
import EmploymentIcon from "../../icons/EmploymentIcon";
import { employmentDuration } from "../../utils";

const TrainerDashboard = () => {
  const user= useSelector((state:any)=>state.user?.userDetail);
  const [upcommingEvents, setUpcommingEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const fileUrl= process.env.REACT_APP_FILE_URL;
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const role = localStorage.getItem('role');
  

  useEffect(()=>{
      getFriends();
  },[]);

  const updateUser=async (values:any)=>{
    const result= await updateUserById(values);
    dispatch(setUserDetail(result?.data?.data));
  }

  const navigateToProfile=()=>{
    navigate('/trainer/trainer-dashboard?tab=profile&tabKey=accountSetting');
    setTimeout(()=>{
      document.getElementById('tabs-layout')?.scrollIntoView({behavior:'smooth',block:'start'})
    },400)
  }

  const getFriends= async()=>{
    try {
      const [eventsData, memberData]= await Promise.all([getAllMyUpcommingEvents({}), getAllTeamMembers({})]);
      setUpcommingEvents(eventsData?.data?.data);
      setMembers(memberData?.data?.data);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="memeberDashboard">
      <div className="banner">
        <img src={"/assets/img/bannerTop.jpg"} alt="bannerTop" className="w-100 h-auto"/>
      </div>
      <div className="container">
        <div className="profileBlock d-flex align-items-start">
          <div className="memberImage">
            <img src={user?.avatar ? fileUrl+user?.avatar :"/assets/img/default-avatar.png"} style={{minWidth:120}} alt="memberImg"/>
          </div>
          <div className="memberInfo">
            <div className="name_private  d-flex">
              <h3>{user?.firstName} {user?.lastName}</h3>
              {/* <Dropdown>
                <Dropdown.Toggle variant="success" className="text-capitalize" id="dropdown-basic">{user?.visibility=='public'?LANG.PUBLIC:LANG.PRIVATE}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Form.Check type="switch"  id="custom-switch" checked={user?.visibility=='private'}
                   onChange={(event)=>{
                    if(event.target.checked){
                      updateUser({visibility:'private'})
                    }else{
                      updateUser({visibility:'public'})
                    }
                   }} />
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Urlaub</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form.Check type="switch" checked={user?.onVocation}  id="custom-switch"
                   onChange={(event)=>{
                      updateUser({onVocation:event.target.checked})
                   }} />
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            <p>{user?.description}</p>
            <ul className="memberDetail">
                <li>Email : <label>{user?.email}</label></li>
                <li>{LANG.CONTACT} : <label>{user?.phone}</label></li>
                <li>{LANG.ADDRESS} : <label>{user?.street} {user?.houseNumber} {user?.zipcode} {user?.city} {user?.birthPlaceCity} {user?.birthPlaceCountry} {user?.nationality}</label></li>
            </ul>
          </div>
          {/* <button className="eidtProfileBtn" onClick={navigateToProfile}>{LANG.EDIT_PROFILE} <EditIcon/></button> */}
        </div>
        <div className="threeBlocks">
          <div className="row">
            <div className="col-md-4">
              <div className="blockWrapper d-flex justify-content-between">
                <div className="">
                  <h4>{employmentDuration(user?.createdAt)}</h4>
                  <span>{LANG.EMPLOYMENT_DURATION}</span>
                </div>
                <span className="bg-yellow-badge">
                   <EmploymentIcon />
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blockWrapper d-flex justify-content-between">
                <div className="">
                  <h4>{members?.length}</h4>
                  <span>{LANG.TOTAL_TEAM_MEMBER}</span>
                </div>
                <GroupUsersIcon/>
              </div>
            </div> 
            <div className="col-md-4">
              <div className="blockWrapper d-flex justify-content-between">
                <div className="">
                  <h4>{upcommingEvents?.length}</h4>
                  <span>{LANG.UPCOMING_EVENTS}</span>
                </div>
                <CalendarIcon/>
              </div>
            </div>
          </div>
        </div>
        <hr className="divider"></hr>
        <div className="tabOuter" id="tabs-layout">
          <TrainerTab/>
        </div>
      </div>
    </div>


    <div>

  {/* /Request Modal */}
</div>

    </div>
  );
};

export default TrainerDashboard;
