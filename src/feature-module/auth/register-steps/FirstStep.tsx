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
        <h2 className="text-center">Grow your business with fitpond</h2>
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
             
              <button
                // disabled={error? true: false}
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                Continue
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