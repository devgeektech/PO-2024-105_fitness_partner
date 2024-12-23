import React, { useEffect, useState } from 'react';
import "./style.scss";
import SingleSlideSlider from '../../../core/components/singleSlideSlider';
import TimerIcon from '../../../icons/TimerIcon';
import BusinessIcon from '../../../icons/BusinessIcon';
import CalendarIcon from '../../../icons/CalendarIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';
import { Link, useLocation } from 'react-router-dom';
import EditIcon from '../../../icons/EditIcon';
import EditGreyIcon from '../../../icons/EditGreyIcon';
import { all_routes } from '../../router/all_routes';
import { getClassDetails } from '../../../services/classes.service';
import { useSelector } from 'react-redux';

export default function DetailClass() {
  const route = all_routes;
  const locationId = localStorage.getItem('locationId') || '';
  const location = useLocation();
  const { id } = location.state || {};
  const [classDetails, setClassDetails] = useState<any>({});


  useEffect(() => {
    getClasseDetails(id);
  }, []);

  const getClasseDetails = async (id: string) => {
    try {
      const result = await getClassDetails(id);
      setClassDetails(result?.data?.data || {});
      console.log('classDetails --------- ',classDetails);
      
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className='classDetail'>
      <div className='container'>
        <div className='sliderWrap mt-3'>
          <div className='singleSlideSlider'>
            <SingleSlideSlider />
          </div>
        </div>
        <div className='classTop mt-4 d-flex justify-content-between align-items-start'>
          <div className='classLeftSide'>
            {classDetails?.partnerDetails.businessName            }
            {/* <span><BusinessIcon />{classDetails?.partnerDetails?.businessName}</span> */}
            <h2 className='my-3'>{classDetails?.className}</h2>
            <ul>
              <li><CalendarIcon />{classDetails?.classType}</li>
              <li><GroupUsersIcon />15</li>
            </ul>
          </div>
          <div className='classRightSide'>
            <Link to={'/classes/create/'}><EditGreyIcon />Edit class</Link>
          </div>
        </div>
        <div className="aboutContent">
          <h3>About cardio</h3>
          <p className="mb-0">You are always changing.  Your practice should too. At ID Hot Yoga you are not confined to a flow.  Classes evolve.  Instructors tailor.  This is a yoga experience designed around you.  Because you are like no other. Transformation is inevitable.</p>
        </div>
        <div className="timingContent">
          <h3>Class timings</h3>
          <ul>
            <li><TimerIcon /><span>Monday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Tuesday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Wednesday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Thursday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Friday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Saturday</span>|<span>05.00 AM - 04:00 PM</span></li>
            <li><TimerIcon /><span>Sunday</span>|<span>05.00 AM - 04:00 PM</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
