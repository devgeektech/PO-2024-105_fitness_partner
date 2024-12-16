import React from 'react'
import { Link } from 'react-router-dom'
import ArrowWhiteRightIcon from '../../../icons/ArrowWhiteRightIcon'
import "./style.scss";
import CalendarIcon from '../../../icons/CalendarIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';
export default function GamesBlock() {
  return (
    <div className='gamesBlock'>
        <div className='gameImg'>
            <img src='/assets/img/cardio.png' alt='cardio'/>
            <label className='badge'>Active</label>
        </div>
        <div className='gameContent'>
            <div className='name_btn d-flex justify-content-between align-items-start mb-2'>
                <Link to={'#'} className='title'>Cardio</Link>
                <Link to={'#'} className='gameBtn'><ArrowWhiteRightIcon/></Link>
            </div>
            <ul>
                <li><CalendarIcon/>Yearly</li>
                <li><GroupUsersIcon/>15</li>
            </ul>
        </div>
    </div>
  )
}
