import React, { useState } from 'react'
import { all_routes } from '../router/all_routes'
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { LANG } from '../../constants/language';
import CommonButton from '../../core/components/button/page';
import VisibilityBox from '../../core/components/VisibilityBox';
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { requestPassword, requestVerifyAndChangePassword } from '../../services/auth.service';
import { toast } from 'react-toastify';
import ErrorText from '../../core/components/error-text';
import { AxiosError } from 'axios';
import EmailIcon from '../../icons/EmailIcon';
import BackIcon from '../../icons/BackIcon';
import WarningIcon from '../../icons/WarningIcon';

const initialValues = {
  email: '',
  otp: '',
  password: ""
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(LANG.EMAIL_IS_REQUIRED),
  otp: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(6, 'Maximum 6 symbols')
})


const ForgotPassword = () => {
  const routes = all_routes;
  const [otpSended, setOtpSended] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setTimeout(() => {
        if (otpSended) {
          requestVerifyAndChangePassword(values.email, values.otp, values.password)
            .then(({ data: { result } }) => {
              setOtpSended(false);
              console.log(result)
              toast.success(LANG.PASSWORD_CHANGED_SUCCESSFULLY)
              navigate('/auth/login');
            })
            .catch((ex) => {
              setSubmitting(false);
              if(ex instanceof AxiosError){
                toast.error(ex.response?.data?.responseMessage);
              }else{
                toast.error(LANG.INVALID_EMAIL_ADDRESS);
              }
              setStatus('The detail is incorrect')
            })
        } else {
          requestPassword(values.email)
            .then(({ data: { result } }) => {
              setOtpSended(true);
              console.log(result)
            })
            .catch(() => {
              setSubmitting(false)
              setStatus('The login detail is incorrect');
              toast.error(LANG.OTP_EXPIRED);
            })
        }
      }, 1000)
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    // <div className='main-wrapper authendication-pages'>
    //   <div className="content blur-ellipses">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-6 col-lg-6 mx-auto vph-100 d-flex align-items-center">
    //           <div className="forgot-password w-100">
    //             <header className="text-center forgot-head-title">
    //               <ImageWithBasePath src="assets/img/logo.png" className="img-fluid" alt="Logo" />
    //             </header>
    //             <div className="shadow-card">
    //               <h2>{LANG.FORGOT_PASSWORD}</h2>
    //               <p>{LANG.ENTER_REGISTERED_EMAIL}</p>
    //               {/* Login Form */}
    //               <form onSubmit={formik.handleSubmit}>
    //                 <div className="form-group">
    //                   <div className="group-img">
    //                     <input
    //                       type='email'
    //                       placeholder={LANG.ENTER_EMAIL_ADDRESS}
    //                       autoComplete='off'
    //                       readOnly={otpSended}
    //                       {...formik.getFieldProps('email')}
    //                       className={clsx(
    //                         'commonInput form-control',
    //                         { 'is-invalid': formik.touched.email && formik.errors.email },
    //                         {
    //                           'is-valid': formik.touched.email && !formik.errors.email,
    //                         }
    //                       )}
    //                     />
    //                     <ErrorText show={formik.touched.email && formik.errors.email} message={formik.errors?.email} />
    //                   </div>
    //                 </div>

    //                 <VisibilityBox show={otpSended}>
    //                   <div className='fv-row mb-8'>
    //                     <label className='form-label fw-bolder text-gray-900 fs-6'>OTP</label>
    //                     <input
    //                       type='string'
    //                       placeholder='OTP'
    //                       autoComplete='off'
    //                       {...formik.getFieldProps('otp')}
    //                       className={clsx(
    //                         'form-control bg-transparent',
    //                         { 'is-invalid': formik.touched.otp && formik.errors.otp },
    //                         {
    //                           'is-valid': formik.touched.otp && !formik.errors.otp,
    //                         }
    //                       )}
    //                     />
    //                     <ErrorText show={formik.touched.otp && formik.errors.otp} message={formik.errors?.otp} />
    //                   </div>
    //                   <div className="fv-row mb-3">
    //                     <label className="form-label fw-bolder text-dark fs-6 mb-0">
    //                       {LANG.PASSWORD}
    //                     </label>
    //                     <div className="form-group">
    //                       <div className="pass-group group-img">
    //                         <i
    //                           className={`toggle-password ${passwordVisible ? "feather-eye" : "feather-eye-off"}`}
    //                           onClick={togglePasswordVisibility}
    //                         />
    //                         <input
    //                           type={passwordVisible ? "text" : "password"}
    //                           placeholder={LANG.PASSWORD}
    //                           {...formik.getFieldProps("password")}
    //                           className={clsx(
    //                             "form-control commonInput pass-input bg-transparent",
    //                             { "border border-danger": formik.touched.password && formik.errors.password },
    //                           )}
    //                         />
    //                       </div>
    //                       <ErrorText show={formik.touched.password && formik.errors.password} message={formik.errors?.password} />
    //                     </div>
    //                   </div>
    //                 </VisibilityBox>
    //                 <CommonButton type='submit' label={LANG.SUBMIT} />
    //               </form>
    //               {/* /Login Form */}

    //             </div>
    //             <div className="bottom-text text-center">
    //               <p>{LANG.REMEMBER_PASSWORD}? <Link to={routes.login} className='text-underline'>{LANG.SIGN_IN}!</Link></p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="main-wrapper authendication-pages">
    {/* Page Content */}
    <div className="content">
      <div className="container wrapper no-padding">
        <div className="row no-margin vph-100">

          <div className="col-12 col-sm-12  col-lg-4 no-padding">
            <div className="dull-pg">
              <div className="row no-margin vph-100 d-flex align-items-top justify-content-center">
                <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                  <header className="text-center position-relative">
                    <Link className='backBtn' to={"/login"}><BackIcon/></Link>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                  </header>
                  <div className="shadow-card">
                    <h2 className="text-center">Forgot password </h2>
                    <p className="text-center">Please enter the email which is registered with your account</p>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="user"
                        role="tabpanel"
                        aria-labelledby="user-tab"
                      >
                        {/* Login Form */}
                        <form onSubmit={formik.handleSubmit} >
                          <div className="form-group">
                            <div className="group-img iconLeft email position-relative">
                              <label><EmailIcon/></label>
                              <input
                                type="text"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                                className={clsx(
                                  "form-control commonInput bg-transparent",
                                  { "border border-warning": formik.touched.email && formik.errors.email },
                                )}
                              />
                            </div>
                            <ErrorText show={formik.touched.email && formik.errors.email} message= {formik.errors?.email} />
                          </div>
                        
                          <button type="submit" className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block">
                           Continue
                          </button>
                        </form>
                        {/* /Login Form */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-lg-8 no-padding">
            <div className="banner-bg login">
              <div className="row no-margin h-100">
                <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                  <div className="h-100 d-flex justify-content-center align-items-center">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Page Content */}
  </div>
  )
}

export default ForgotPassword