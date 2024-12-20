import React from 'react'
import { Link } from 'react-router-dom'
import ArrowWhiteRightIcon from '../../../icons/ArrowWhiteRightIcon'
import "./style.scss";
import CalendarIcon from '../../../icons/CalendarIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';

export default function ClassesCard({ className, image, status, classType, participants }: any) {

    return (
        <div className='classesBlock'>
            <div className='gameImg'>
                <img src={image || '/assets/img/cardio.png'} alt={className} />
                <label className='badge'>{status}</label>
            </div>
            <div className='gameContent'>
                <div className='name_btn d-flex justify-content-between align-items-start mb-2'>
                    <Link to={'#'} className='title'>{className}</Link>
                    <Link to={'#'} className='gameBtn'><ArrowWhiteRightIcon /></Link>
                </div>
                <ul>
                    <li><CalendarIcon />{classType}</li>
                    <li><GroupUsersIcon />{participants || 0}</li>
                </ul>
            </div>
        </div>
    )
}
