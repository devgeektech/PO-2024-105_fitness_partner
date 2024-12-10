import React from "react";
import { PAYMENT_UNSUCCESSFUL, PAYMENT_UNSUCCESSFUL_CONTENT } from "../../../constants/utlis";
export default function PaymentUnsuccessful() {

  return (
    <div className="authForm d-flex flex-column justify-content-between">
      <div className="authFormInner">
     
        <div className="formWrapper unsuccessful text-center d-flex flex-column justify-content-between">
         
          <div className="">
            <div className="logoWrapper text-center">
              <img src={"assets/img/CrossIcon.png"} alt="CrossIcon" />
            </div>
            <div className="title-dec">
              <h2 className="mb-0">{PAYMENT_UNSUCCESSFUL}</h2>
              <p className="mb-0 unsuccess">{PAYMENT_UNSUCCESSFUL_CONTENT}</p>
            </div>
            <form autoComplete="off">
              <div className="paymentUnsuccess">
                <ul className="p-0 d-grid justify-content-center flex-column mb-0">
                  <h4>Instructions:</h4>
                  <li>Ensure your information is correct.</li>
                  <li>Verify that your bank has sufficient funds.</li>
                </ul>
              </div>
            </form>  
          </div>  
          <div className="">
            <div className="mt-4">
            <button
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                Retry Payment
              </button>
              <button
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
