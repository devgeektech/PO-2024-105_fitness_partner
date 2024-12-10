
import React from "react";
import clsx from "clsx";
import { LANG } from "../../../constants/language";
import { alphaOnly, getAge } from "../../../utils";
import ErrorText from "../../../core/components/error-text";
import VisibilityBox from "../../../core/components/VisibilityBox";

interface Props {
  formik: any,
  registerValue: any
}

export default function SecondStep({ formik, registerValue }: Props) {

  const markAsTouched = async() => {
    await formik.validateForm();
  }
  return (
    <div className="authForm d-flex flex-column justify-content-between">
      <div className="authFormInner">
        <div className="formWrapper  text-center">
          <div className="title-dec mb-3">
            <ul className="steps my-5">
              <li className="active"></li>
              <li></li>
              <li></li>
            </ul>
            <p className="mb-0">{LANG.REGISTER_PARENT_MSG}</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <VisibilityBox show={getAge(registerValue?.dob) < 18}>
              <div className="mb-3 text-start">
                <label className="mb-2">Übergeordnetes Detail</label>
                <div className="d-flex gap-1">
                  <div className="form-group col-md-6" >
                    <input
                      type="text"
                      placeholder={LANG.FIRSTNAME_PARENTS}
                      onKeyPress={alphaOnly}
                      autoComplete="off"
                      maxLength={64}
                      {...formik.getFieldProps("parentFirstName")}
                      className={clsx(
                        "commonInput form-control",
                        { "border border-danger": formik.touched.parentFirstName && formik.errors.parentFirstName },
                      )}
                    />
                    <ErrorText show={formik.errors.parentFirstName} message={formik.errors?.parentFirstName} />
                  </div>
                  <div className="form-group col-md-6" >
                    <input
                      type="text"
                      placeholder={LANG.LASTNAME_PARENTS}
                      onKeyPress={alphaOnly}
                      maxLength={64}
                      {...formik.getFieldProps("parentLastName")}
                      className={clsx(
                        "commonInput form-control",
                        { "border border-danger": formik.touched.parentLastName && formik.errors.parentLastName },
                      )}
                    />
                    <ErrorText show={formik.errors.parentLastName} message={formik.errors?.parentLastName} />
                  </div>
                </div>
                <div className="d-flex gap-1 mt-3">
                  <div className="form-group col-md-6" >
                    <input
                      type="email"
                      placeholder={LANG.EMAIL_PARENTS}
                      maxLength={256}
                      {...formik.getFieldProps("parentEmail")}
                      className={clsx(
                        "commonInput form-control",
                        { "border border-danger": formik.touched.parentEmail && formik.errors.parentEmail },
                      )}
                    />
                    <ErrorText show={formik.errors.parentEmail} message={formik.errors?.parentEmail} />
                  </div>
                  <div className="form-group col-md-6" >
                    <input
                      type="number"
                      placeholder={LANG.PHONE_PARENTS}
                      min={0}
                      onKeyPress={(event) => {
                        if (event.key == '-') event.preventDefault();
                      }}
                      {...formik.getFieldProps("parentPhone")}
                      className={clsx(
                        "form-control commonInput",
                        { "border border-danger": formik.touched.parentPhone && formik.errors.parentPhone },
                      )}
                    />
                    <ErrorText show={formik.errors.parentPhone} message={formik.errors?.parentPhone} />
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <div className="mb-3 text-start">
              <label className="mb-2">Bankverbindung</label>
              <div className="d-flex gap-1">
                <div className="form-group col-md-6" >
                  <input
                    type="text"
                    placeholder={LANG.BANK_NAME}
                    onKeyPress={alphaOnly}
                    autoComplete="off"
                    maxLength={100}
                    {...formik.getFieldProps("bankName")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.bankName && formik.errors.bankName },
                    )}
                  />
                  <ErrorText show={formik.errors.bankName} message={formik.errors?.bankName} />
                </div>
                <div className="form-group col-md-6" >
                  <input
                    type="text"
                    placeholder={LANG.IBAN_BANK_ACCOUNT}
                    autoComplete="off"
                    {...formik.getFieldProps("iban")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.iban && formik.errors.iban },
                    )}
                  />
                  <ErrorText show={formik.errors.iban} message={formik.errors?.iban} />
                </div>
              </div>
              <div className="d-flex gap-1 mt-3">
                <div className="form-group col-md-6" >
                  <input
                    type="text"
                    placeholder={LANG.BIC_BANK_CODE}
                    autoComplete="off"
                    maxLength={11}
                    {...formik.getFieldProps("bic")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.bic && formik.errors.bic },
                    )}
                  />
                  <ErrorText show={formik.errors.bic} message={formik.errors?.bic} />
                </div>
                <div className="form-group col-md-6" >
                  <input
                    type="text"
                    placeholder={LANG.ACCOUNT_HOLDER}
                    maxLength={64}
                    autoComplete="off"
                    onKeyPress={alphaOnly}
                    {...formik.getFieldProps("accountHolder")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.accountHolder && formik.errors.accountHolder },
                    )}
                  />
                  <ErrorText show={formik.errors.accountHolder} message={formik.errors?.accountHolder} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={()=>markAsTouched()}
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                {LANG.SELECT_PLAN}
                <i className="feather-arrow-right-circle ms-2" />
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
