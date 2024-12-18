import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { useFormik } from "formik";
import Eyeopen from '../../../../icons/Eyeopen';
import Eyeclode from '../../../../icons/Eyeclode';
import clsx from "clsx";
import './style.scss';
import { changeUserPassword } from '../../../../services/auth.service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { LANG } from '../../../../constants/language';
import KeyIcon from '../../../../icons/KeyIcon';

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required(LANG.OLD_PASSWORD_IS_REQUIRED),
  newPassword: Yup.string().required(LANG.NEW_PASSWORD_IS_REQUIRED),
  confirmPassword: Yup.string().required(LANG.CONFIRM_PASSWORD_IS_REQUIRED),
});
export default function ChangePasswordTabContent() {
  // Create separate state variables for each password field
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        try {
          const result: any = await changeUserPassword(values);
          if (result) {
            toast.success(LANG.PASSWORD_CHANGED_SUCCESSFULLY);
          }
        } catch (error) {
          if(error instanceof AxiosError){
            toast.error(error.response?.data?.responseMessage)
          }
        }
      } catch (error) {
        console.log(error)
        setSubmitting(false);
      }
    },
  });
  return (
    <div className='accountSettingTab'>
      <div className='personalIformation bgFormColor p-4 formEditWrap mb-3 changePassword'>
      <h3 className='mb-3'>Change Password</h3>
        {/* <label>{LANG.UPDATE_YOUR_PASSWORD}</label> */}
        <Form onSubmit={formik.handleSubmit}>
          <div className='row'>
            {/* Old Password */}
            <div className='col-md-12'>
              <Form.Group className="mb-3 position-relative">
                <div className='pass-group group-img  iconLeft email position-relative'>
                  <label><KeyIcon/></label>
                <input
                  type={isOldPasswordVisible ? 'text' : 'password'}
                  placeholder='Enter your old password'
                  {...formik.getFieldProps("oldPassword")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.oldPassword && formik.errors.oldPassword },
                  )}
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                >
                  {isOldPasswordVisible ? <Eyeopen /> : <Eyeclode />}
                </button>
                </div>
              </Form.Group>
            </div>
            <h4 className='text-center'>Create a password with combine of alphabets, numbers and symbols (@,#,%, !) </h4>
            {/* New Password */}
            <div className='col-md-12'>
              <Form.Group className="mb-3 position-relative">
              <div className='pass-group group-img  iconLeft email position-relative'>
                <label><KeyIcon/></label>
                <input
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  placeholder='Enter your new password'
                  {...formik.getFieldProps("newPassword")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.newPassword && formik.errors.newPassword },
                  )}
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                >
                  {isNewPasswordVisible ? <Eyeopen /> : <Eyeclode />}
                </button>
                </div>
              </Form.Group>
            </div>

            {/* Confirm Password */}
            <div className='col-md-12'>
              <Form.Group className="mb-3 position-relative">
              <div className='pass-group group-img  iconLeft email position-relative'>
                <label><KeyIcon/></label>
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder='Confirm your new password'
                  {...formik.getFieldProps("confirmPassword")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.confirmPassword && formik.errors.confirmPassword },
                  )}
                />
                <button
                  type="button"
                  className="eyeBtn"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                  {isConfirmPasswordVisible ? <Eyeopen /> : <Eyeclode />}
                </button>
                </div>
              </Form.Group>
            </div>
          </div>

          <Button type='submit' className='updateBtn mt-4'>Update password</Button>
        </Form>
      </div>
    </div>
  );
}
