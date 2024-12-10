import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { GENDERS, MATCH_TYPE } from "../../../constants";
import { NATIONALITIES } from "../../../constants/nationalities";
import clsx from "clsx";
import VisibilityBox from "../../../core/components/VisibilityBox";
import { LANG } from "../../../constants/language";
import { alphaOnly } from "../../../utils";
import ErrorText from "../../../core/components/error-text";
import { COUNTRIES } from "../../../constants/countries";
import { checkEmailExists } from "../../../services/auth.service";

interface Props {
  formik: any
}

const FirstStep = ({ formik }: Props) => {
  const route = all_routes;
  const maxDate= new Date().toISOString().split("T")[0];
  const [error, setError]= useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  
  const checkEmail= (value:any) =>{
    if (!value) return;
    setTimeout(async ()=>{
      const result:any= await checkEmailExists(value);
      console.log(result.data?.data?._id)
    if(result.data?.data?._id){
      setError(LANG.EMAIL_ALREADY_EXISTS)
    }else {
      setError('');
    }
    },300)
  }

  return (
    <>
      <div className="shadow-card">
        <h2 className="text-center">{LANG.JOIN}</h2>
        <p className="text-center">
           {LANG.REGISTER_MSG}
        </p>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="user"
            role="tabpanel"
            aria-labelledby="user-tab"
          >
            {/* Register Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <select {...formik.getFieldProps("type")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.type && formik.errors.type },
                  )}>
                  <option value={""}>{LANG.PLEASE_CHOOSE}</option>
                  {MATCH_TYPE.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
                <ErrorText show={formik.errors.type} message={formik.errors?.type} />
                     
              </div>
              <VisibilityBox show={formik?.values?.type == "Vereinswechsel"}>
                <div className="form-group">
                  <div className="group-img">
                    <input
                      type="text"
                      maxLength={64}
                      className="form-control commonInput"
                      placeholder={LANG.LAST_CLUB}
                      {...formik.getFieldProps("lastClub")}
                    />
                  </div>
                  <ErrorText show={formik.errors.lastClub} message={formik.errors?.lastClub} />
                
                </div>
              </VisibilityBox>
              <div className="d-flex gap-1">
                <div className="w-1/2 form-group">
                  <div className="group-img">
                    <input
                      type="text"
                      placeholder={LANG.FIRST_NAME}
                      maxLength={64}
                      onKeyPress={alphaOnly}
                      {...formik.getFieldProps("firstName")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.firstName && formik.errors.firstName },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.touched.firstName && formik.errors.firstName} message={formik.errors?.firstName} />
                </div>
                <div className="w-1/2 form-group">
                  <div className="group-img">
                    <input
                      type="text"
                      placeholder={LANG.LAST_NAME}
                      maxLength={64}
                      onKeyPress={alphaOnly}
                      {...formik.getFieldProps("lastName")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.lastName && formik.errors.lastName },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.touched.lastName && formik.errors.lastName} message={formik.errors?.lastName} />
                </div>

              </div>
              <div className="d-flex gap-1">
                <div className="w-100 form-group">
                <select {...formik.getFieldProps("gender")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.gender && formik.errors.gender },
                  )}>
                  <option value={""}>{LANG.PLEASE_CHOOSE}</option>
                  {GENDERS.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
                <ErrorText show={formik.errors.gender} message={formik.errors?.gender} />
                    
                </div>
              </div>
              <div className="d-flex gap-1">
                <div className="form-group">
                  <div className="group-img">
                    <input
                      type="text"
                      placeholder={LANG.STREET}
                      maxLength={100}
                      {...formik.getFieldProps("street")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.street && formik.errors.street },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.street} message={formik.errors?.street} />
                </div>
                <div className="form-group">
                  <div className="group-img">
                    <input
                      type="number"
                      placeholder={LANG.HOUSE_NO}
                      min={0}
                      {...formik.getFieldProps("houseNumber")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.houseNumber && formik.errors.houseNumber },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.houseNumber} message={formik.errors?.houseNumber} />
                </div>
              </div>
              <div className="d-flex gap-1">
                <div className="form-group">
                  <div className="group-img">
                    <input
                      type="number"
                      placeholder={LANG.ZIP_CODE}
                      min={0}
                      {...formik.getFieldProps("zipCode")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.zipCode} message={formik.errors?.zipCode} />
                </div>
                <div className="form-group">
                  <div className="group-img">
                    <input
                      type="text"
                      placeholder={LANG.CITY}
                      maxLength={32}
                      {...formik.getFieldProps("city")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.city && formik.errors.city },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.city} message={formik.errors?.city} />
                </div>
              </div>
              <div className="d-flex gap-1">
                <div className="form-group col-md-6" >
                  <div className="group-img">
                    <input
                      type="date"
                      max={maxDate}
                      placeholder={LANG.BIRTHDAY}
                      {...formik.getFieldProps("dob")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.dob && formik.errors.dob },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.dob} message={formik.errors?.dob} />
                </div>
                <div className="form-group col-md-6">
                  <div className="group-img">
                    <input
                      type="text"
                      maxLength={32}
                      placeholder={LANG.BIRTHPLACE_CITY}
                      {...formik.getFieldProps("birthPlaceCity")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.birthPlaceCity && formik.errors.birthPlaceCity },
                      )}
                    />
                  </div>
                  <ErrorText show={formik.errors.birthPlaceCity} message={formik.errors?.birthPlaceCity} />
                </div>
              </div>
              <div className="d-flex gap-1">
                <div className="col-6 form-group">
                <div className="group-img">
                    <select
                      {...formik.getFieldProps("birthPlaceCountry")}
                      className={clsx(
                        "commonInput form-control p-3",
                        { "border border-danger": formik.touched.birthPlaceCountry && formik.errors.birthPlaceCountry },
                      )}>
                      <option value="" disabled hidden>
                        {LANG.SELECT} {LANG.BIRTHPLACE_COUNTRY}
                      </option>
                      {COUNTRIES.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <ErrorText show={formik.errors.birthPlaceCountry} message={formik.errors?.birthPlaceCountry} />
                
                </div>
                <div className="col-6 form-group">
                  <div className="group-img">
                    <select
                      {...formik.getFieldProps("nationality")}
                      className={clsx(
                        "commonInput form-control p-3",
                        { "border border-danger": formik.touched.nationality && formik.errors.nationality },
                      )}>
                      <option value={""}>{LANG.SELECT} {LANG.NATIONALITY}</option>
                      {NATIONALITIES.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <ErrorText show={formik.errors.nationality} message={formik.errors?.nationality} />
                
                </div>

              </div>
              <div className="form-group">
                <div className="group-img">
                  <i className="feather-mail" />
                  <input
                    type="text"
                    placeholder="Email"
                    maxLength={256}
                    {...formik.getFieldProps("email")}
                    onChange={(event)=>{
                       checkEmail(event.target.value);
                       formik.setFieldValue('email', event.target.value);
                    }}
                    className={clsx(
                      "form-control commonInput",
                      { "border border-danger": formik.touched.email && formik.errors.email },
                    )}
                  />
                </div>
                <ErrorText show={formik.errors.email} message={formik.errors?.email} />
                <ErrorText show={!formik.errors.email && error} message={error} />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder={LANG.PHONE}
                  onKeyPress={(event)=>{
                    if(event.key == '-') event.preventDefault();
                  }}
                  min={0}
                  {...formik.getFieldProps("phone")}
                  className={clsx(
                    "form-control commonInput",
                    { "border border-danger": formik.touched.phone && formik.errors.phone },
                  )}
                />
                <ErrorText show={formik.errors.phone} message={formik.errors?.phone} />
                
              </div>
              <div className="form-group">
                <div className="pass-group group-img">
                  <i
                    className={`toggle-password ${confirmPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                    onClick={toggleConfirmPasswordVisibility}
                  />
                  <input
                    type={
                      confirmPasswordVisible ? "text" : "password"
                    }
                    maxLength={64}
                    placeholder={LANG.PASSWORD}
                    {...formik.getFieldProps("password")}
                    className={clsx(
                      "form-control pass-input commonInput",
                      { "border border-danger": formik.touched.password && formik.errors.password },
                    )}
                  />
                </div>
                <ErrorText show={formik.errors.password} message={formik.errors?.password} />
                
              </div>
              <div className="form-group">
                <div className="pass-group group-img">
                  <i
                    className={`toggle-password ${passwordVisible ? "feather-eye" : "feather-eye-off"}`}
                    onClick={togglePasswordVisibility}
                  />
                  <input
                    type={
                      passwordVisible ? "text" : "password"
                    }
                    maxLength={64}
                    placeholder={LANG.CONFIRM_PASSWORD}
                    {...formik.getFieldProps("confirmPassword")}
                    className={clsx(
                      "form-control pass-input commonInput",
                      { "border border-danger": formik.touched.confirmPassword && formik.errors.confirmPassword },
                    )}
                  />
                </div>
                <ErrorText show={formik.errors.confirmPassword} message={formik.errors?.confirmPassword} />
              </div>
              <button
                disabled={error? true: false}
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                {LANG.CONTINUE}
              </button>
            </form>
            {/* /Register Form */}
          </div>
          <div
            className="tab-pane fade"
            id="coach"
            role="tabpanel"
            aria-labelledby="coach-tab"
          >
          </div>
        </div>
      </div>
      <div className="bottom-text text-center">
        <p>
          {LANG.HAVE_AN_ACCOUNT}{" "}
          <Link to={route.login} className="text-underline">{LANG.SIGN_IN}!</Link>
        </p>
      </div>
    </>
  )
}

export default FirstStep