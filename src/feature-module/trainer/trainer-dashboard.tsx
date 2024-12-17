import React, { useEffect, useState } from "react";
import { LANG } from "../../constants/language";
import { Dropdown, Form } from "react-bootstrap";
import EditIcon from "../../icons/EditIcon";
import MembershipIcon from "../../icons/MembershipIcon";
import GroupUsersIcon from "../../icons/GroupUsersIcon";
import DoubleUserIcon from "../../icons/DoubleUserIcon";
import "./style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUserById } from "../../services/user.service";
import { setUserDetail } from "../../core/data/redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getMyFriends } from "../../services/friends.service";
import TrainerTab from "./tabs/page";
import { getAllTeamMembers } from "../../services/teams.service";
import CalendarIcon from "../../icons/CalendarIcon";
import { getAllMyUpcommingEvents } from "../../services/event.service";
import EmploymentIcon from "../../icons/EmploymentIcon";
import { employmentDuration } from "../../utils";
import EditGreyIcon from "../../icons/EditGreyIcon";
import GlobeIcon from "../../icons/GlobeIcon";
import LocationIcon from "../../icons/LocationIcon";
import LocationGreyIcon from "../../icons/LocationGreyIcon";
import TimerIcon from "../../icons/TimerIcon";
import SingleSlideSlider from "../../core/components/singleSlideSlider";
import MultiColumnSlider from "../../core/components/multiColumSlider";
import GamesBlock from "../../core/components/games";
// import Swiper from 'swiper';


const TrainerDashboard = () => {
  const user = useSelector((state: any) => state.user?.userDetail);
  const [upcommingEvents, setUpcommingEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = localStorage.getItem("role");

  useEffect(() => {
    getFriends();
  }, []);

  const updateUser = async (values: any) => {
    const result = await updateUserById(values);
    dispatch(setUserDetail(result?.data?.data));
  };

  const navigateToProfile = () => {
    navigate("/trainer/trainer-dashboard?tab=profile&tabKey=accountSetting");
    setTimeout(() => {
      document
        .getElementById("tabs-layout")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  const getFriends = async () => {
    try {
      const [eventsData, memberData] = await Promise.all([
        getAllMyUpcommingEvents({}),
        getAllTeamMembers({}),
      ]);
      setUpcommingEvents(eventsData?.data?.data);
      setMembers(memberData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mainWrapper">
        <div className="banner">
          <img
            src={"/assets/img/bannerTop.jpg"}
            alt="bannerTop"
            className="w-100 h-auto"
          />
        </div>
        <div className="profileContentWrapper">
          <div className="profileContentWrapperInner">
            <div className="container">
              <div className="profileContent">
                <div className="profileImg">
                  <img src={"/assets/img/DefaultProfile.png"} alt="DefaultProfile" className="profileDp" />
                </div>
                <div className="p_content d-flex justify-content-between">
                    <div className="">
                      <h1>ID Yoga - FiDi</h1>
                      <p><LocationGreyIcon/><Link to={""} className="underline">121 Fulton St, New York, NY 10038, USA</Link></p>
                      <p><GlobeIcon/><Link to={""} className="underline">www.idhotyoga.com</Link></p>
                      <div className="tags">
                        <label className="tag">Boxing</label>
                        <label className="tag">Pickleball</label>
                        <label className="tag">Spinning</label>
                      </div>
                    </div>
                    <div className="EditWrap">
                      <button><EditGreyIcon/>Edit setting</button>
                    </div>
                </div>
              </div>
            </div>  
          </div>
          
        </div>
        <div className="container">
            <div className="aboutContent">
              <h3>About</h3>
              <p className="mb-0">You are always changing.  Your practice should too. At ID Hot Yoga you are not confined to a flow.  Classes evolve.  Instructors tailor.  This is a yoga experience designed around you.  Because you are like no other. Transformation is inevitable.</p>
            </div>
            <div className="timingContent">
            <h3>Timings</h3>
            <ul>
              <li><TimerIcon/><span>Monday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Tuesday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Wednesday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Thursday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Friday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Saturday</span>|<span>05.00 AM - 04:00 PM</span></li>
              <li><TimerIcon/><span>Sunday</span>|<span>05.00 AM - 04:00 PM</span></li>
            </ul>
          </div>
          <div className="mulitColumnSliderWrapper">
            <h3>Classes</h3>
            {/* <MultiColumnSlider/> */}
            <div className="mulitColumnSlider">
              {/* <GamesBlock/> */}
              <MultiColumnSlider/>
            </div>
          </div>
          <div className="singleSlideSlider">
            <h3>Glimpse of gym</h3>
              <SingleSlideSlider/>
          </div>


        </div>

        {/* <div className="container">
          <hr className="divider"></hr>
          <div className="tabOuter" id="tabs-layout">
            <TrainerTab />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TrainerDashboard;
