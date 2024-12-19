import React from 'react';
import './style.scss';
import { Form } from 'react-bootstrap';
import LocationIcon from '../../../icons/LocationIcon';
import FileIcon from '../../../icons/FileIcon';

export default function ClassesTab() {
  return (
    <div className='classesTabWrap'>
        <div className='bgFormColor p-4 mb-3'>
            <label>Class information</label>
            <div className='row'>
                <div className='col-md-4'>
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
                <div className='col-md-4'>
                <Form.Select aria-label="Default select example" className='commonInput form-control'>
                    <option>Select service</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                </div>
                <div className='col-md-4'>
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
                            <Form.Control className='commonInput' type='text'  placeholder='Class name' /> 
                        </div>
                    </Form.Group>
                </div>
            </div>
        </div>
    </div>
  )
}
