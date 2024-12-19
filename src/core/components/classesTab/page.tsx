import React, { useState } from 'react';
import './style.scss';
import { Form } from 'react-bootstrap';
import LocationIcon from '../../../icons/LocationIcon';
import FileIcon from '../../../icons/FileIcon';
import ArrowBottomIcon from '../../../icons/ArrowBottomIcon';
import AngleWhiteBottomIcon from '../../../icons/AngleWhiteBottomIcon';
import AngleWhiteTopIcon from '../../../icons/AngleWhiteTopIcon';
import CrossWhiteBlackIcon from '../../../icons/CrossWhiteBlackIcon';
import { Link } from 'react-router-dom';
import CrossIcon from '../../../icons/CrossIcon';
import TimerIcon from '../../../icons/TimerIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';

export default function ClassesTab() {
    const items = ["Item 1", "Item 2", "Item 3"];
    const [count, setCount] = useState(0); 

    function increment() {
        //setCount(prevCount => prevCount+=1);
        setCount(function (prevCount) {
          return (prevCount += 1);
        });
      }
    
      function decrement() {
        setCount(function (prevCount) {
          if (prevCount > 0) {
            return (prevCount -= 1); 
          } else {
            return (prevCount = 0);
          }
        });
      }
    
  return (
    <div className='classesTabWrap'>
        <div className='bgFormColor p-4 mb-3'>
            <label>Class information</label>
            <div className='row'>
                <div className='col-md-4 mb-3'>
                    <div className='statusCheck d-flex justify-content-between align-items-center w-100'>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                            <span>Class status</span>
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mb-3'>
                <Form.Select aria-label="Default select example" className='commonInput form-control'>
                    <option>Select service</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                </div>
                <div className='col-md-4 mb-3'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <div className="group-img iconLeft  position-relative textareaWrap">
                            <Form.Control className='commonInput' type='text'  placeholder='Class name' /> 
                        </div>
                    </Form.Group>
                </div>
                <div className='col-sm-12'>
                    <div className="group-img iconLeft  position-relative textareaWrap">
                        <label><FileIcon/></label>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={2} placeholder='Tell us something about your class'
                            className="addressTextarea" />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
        <div className='bgFormColor p-4 mb-3'>
            <label>Class start date</label>
            <div className='row'>
                <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <div className="group-img iconLeft  position-relative textareaWrap">
                            <Form.Control className='commonInput' type='date'  placeholder='Class name' /> 
                        </div>
                    </Form.Group>
                </div>
            </div>
            <div className='wrap mt-3'>
                <label>Class timings</label>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div className="group-img iconLeft  position-relative textareaWrap">
                                <Form.Control className='commonInput' type='time'  placeholder='Class name' /> 
                            </div>
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div className="group-img iconLeft  position-relative textareaWrap">
                                <Form.Control className='commonInput' type='time'  placeholder='Class name' /> 
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ul className='daysCheckbox'>
                            <li><label><input type="checkbox" /><span className='day'>Everyday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Monday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Tuesday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Wednesday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Thursday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Friday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Saturday</span> <span className='bg'></span></label></li>
                            <li><label><input type="checkbox" /><span className='day'>Sunday</span> <span className='bg'></span></label></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='wrap mt-3'>
                <label>Class repeat</label>
                <div className='row align-items-end'>
                    <div className='col-xl-4'>
                        <div className='statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2'>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <label className='mb-0 d-flex align-items-center'>
                                    <input type='radio' name='radio_name'/>
                                        <span className='radioText'>Does not repeat</span>
                                        <span className='bgBlue'></span>
                                </label>
                            </div>
                        </div>
                        <div className='statusCheck d-flex justify-content-between align-items-center w-100 position-relative'>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <label className='mb-0 d-flex align-items-center'>
                                    <input type='radio' name='radio_name'/>
                                        <span className='radioText'>Repeat every</span>
                                        <span className='bgBlue'></span>
                                    <div className='addOption'>
                                        <input value={count} />
                                        <div className='btnsWrap'>
                                            <button onClick={increment}><AngleWhiteTopIcon/></button>
                                            <button className='rotate' onClick={decrement}><AngleWhiteTopIcon/></button>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-8'>
                        <ul className='daysRadioBox'>
                            <li><label><input type="radio" name='slot'/><span className='day'>Day</span> <span className='bg'></span></label></li>
                            <li><label><input type="radio" name='slot' /><span className='day'>Week</span> <span className='bg'></span></label></li>
                            <li><label><input type="radio" name='slot' /><span className='day'>Month</span> <span className='bg'></span></label></li>
                            <li><label><input type="radio" name='slot' /><span className='day'>Year</span> <span className='bg'></span></label></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='wrap mt-3'>
                <label>Class ends</label>
                <div className='row'>
                    <div className='col-xl-4'>
                        <div className='classEnd'>
                            <div className='statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2'>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <label className='mb-0 d-flex align-items-center'>
                                        <input type='radio' name='radio_never'/>
                                            <span className='radioText'>Never</span>
                                            <span className='bgBlue'></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4'>
                        <div className='classEnd'>
                            <div className='statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2'>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <label className='mb-0 d-flex align-items-center'>
                                        <input type='radio' name='radio_never'/>
                                            <span className='radioText'>On</span>
                                            <span className='bgBlue'></span>
                                    </label>
                                    <div className='dateShow'>
                                        <input type='date'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4'>
                        <div className='classEnd'>
                            <div className='statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2'>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <label className='mb-0 d-flex align-items-center'>
                                        <input type='radio' name='radio_never'/>
                                            <span className='radioText'>After</span>
                                            <span className='bgBlue'></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='addedTime my-3'>
              <li><button><CrossIcon/></button><TimerIcon/><label>Monday, Tuesday | 05.00 AM - 04:00 PM | end on 4 Feb 2025</label></li>
            </ul>
            </div>    
        </div>
        <div className='bgFormColor p-4 mb-3'>
            <label>Class capacity</label>
            <div className='row'>
                <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <div className="group-img iconLeft rightLeft  position-relative textareaWrap">
                            <label><GroupUsersIcon/></label>
                            <Form.Control className='commonInput' type='text'  placeholder='Class name' /> 
                            <span className='person'>| person</span>
                        </div>
                    </Form.Group>
                </div>
            </div>
        </div>
        <div className='bgFormColor p-4 mb-3'>
            <label>Class images</label>
            <div className='uploadWrapper'>
                <ul className='outerBlock'>
                  <li>
                  <ul className='showImages'>
                      {items && items.map((item,index) =>{ return <li className='position-relative'>
                        <button className='crossBtn'><CrossWhiteBlackIcon/></button>
                        <div className='image'>
                          <img src={'/assets/img/uploadOne.png'} alt='uploadOne' className='w-100 '/>
                        </div>
                      </li>})}
                      <li className='uploadBlock'>
                        <div className='upload text-center'>
                          <input type='file'/>
                          <img src={"/assets/img/uploadIcon.png"} alt='uploadIcon'/>
                          <p>Drop or upload images</p>
                          <button>Browse image</button>
                        </div>
                      </li>                   
                  </ul>
                  </li>
                </ul>
            </div>
        </div>
        <div className='d-flex flex-column align-items-start'>
            <button type='submit' className='saveBtn'>Save class</button>
            <Link className='policyLink' to={"#"}>Read about our visitors class cancellation policy</Link>
        </div>
    </div>
  )
}
