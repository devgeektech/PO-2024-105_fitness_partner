import React, { useState } from "react";
import { all_routes } from "../router/all_routes";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import BackIcon from "../../icons/BackIcon";
import KeyIcon from "../../icons/KeyIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LANG } from "../../constants/language";
import { createNewPAssword } from "../../services/auth.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const routes = all_routes;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Access state passed via `navigate`
  const location = useLocation();
  const { email, onBoarding } = location.state || {}; // Use fallback empty object to avoid errors

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: email,
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(LANG.PLEASE_ADD_VALID_EMAIL).required(LANG.EMAIL_IS_REQUIRED),
    password: Yup.string().required(LANG.PASSWORD_IS_REQUIRED),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const result = await createNewPAssword(values);
        console.log('result ========= ',result);
        
        if (result.status == 200) {
          toast.success(LANG.LOGIN_SUCCESSFULLY);
          // localStorage.setItem('token', result.data?.data?.token);
          // localStorage.setItem('id', result.data?.data?._id);
          // dispatch(setLogin(true));
          // dispatch(setUserDetail(result.data?.data));
          // http.defaults.headers['Authorization'] = result.data?.data?.token;
          // navigate(route.Settings);
        } else if (result.status == 404) {
          console.log(values)
        }
        setSubmitting(false);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.responseMessage)
        }
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });


  return (
    <div className="main-wrapper authendication-pages">
      <div className="content">
        <div className="container wrapper no-padding">
          <div className="row no-margin vph-100">
            <div className="col-12 col-sm-12  col-lg-4 no-padding">
              <div className="dull-pg">
                <div className="row no-margin vph-100 d-flex align-items-top justify-content-center">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <header className="text-center position-relative">
                      <Link className="backBtn" to={"/auth/login"}>
                        <BackIcon />
                      </Link>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="shadow-card">
                      {onBoarding ?
                        <h2 className="text-center">Create your password</h2> :
                        <h2 className="text-center">Set your new password</h2>}

                      <p className="text-center">
                        Create a password with combine of alphabets, numbers and
                        symbols (@,#,%, !){" "}
                      </p>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                              <div className="pass-group group-img  iconLeft email position-relative">
                                <label>
                                  <KeyIcon />
                                </label>
                                <i
                                  className={`toggle-password ${showPassword ? "feather-eye" : "feather-eye-off"}`}
                                  onClick={togglePasswordVisibility}
                                />
                                <input
                                  type={showPassword ? "text" : "password"}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  value={newPassword}
                                  id="newpassword"
                                  className="form-control pass-confirm"
                                  placeholder="Enter your new Password"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="pass-group group-img  iconLeft email position-relative">
                                <label>
                                  <KeyIcon />
                                </label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  value={confirmPassword}
                                  id="password"
                                  className="form-control pass-confirm"
                                  placeholder="Confirm your new Password"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                            >
                              {onBoarding ?
                                'Create password and go to dashboard' :
                                'Set new Password'}
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
                    <div className="h-100 d-flex justify-content-center align-items-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
