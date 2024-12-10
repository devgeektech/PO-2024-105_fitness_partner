import React from "react";
import { PAYMENT_SUCCESSFUL, PAYMENT_SUCCESSFUL_CONTENT } from "../../../constants/utlis";
import { Link } from "react-router-dom";
export default function PaymentSuccessful() {

  return (
    <div className="authForm d-flex flex-column justify-content-between">
      <div className="authFormInner">     
        <div className="formWrapper unsuccessful text-center d-flex flex-column justify-content-between">
          <div className="">
            <div className="logoWrapper text-center">
              <img src={"assets/img/GreenTickIcon.png"} alt="GreenTickIcon" />
            </div>
            <div className="title-dec">
              <h2 className="mb-0">{PAYMENT_SUCCESSFUL}</h2>
              <p className="mb-0 unsuccess">{PAYMENT_SUCCESSFUL_CONTENT}</p>
            </div> 
          </div>  
          <div className="">
            <div className="mt-4">
              <Link to={'/auth/login'}>
              <button
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                
              >
                Back to home
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
