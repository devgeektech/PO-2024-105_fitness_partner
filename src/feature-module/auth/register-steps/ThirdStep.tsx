import React, { useState } from "react";
import SendSquareIcon from "../../../icons/SendSquareIcon";
import IcosahedronIcon from "../../../icons/IcosahedronIcon";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import clsx from "clsx";
import { LANG } from "../../../constants/language";
import ErrorText from "../../../core/components/error-text";
import VisibilityBox from "../../../core/components/VisibilityBox";
import { Button, Form } from "react-bootstrap";
import { checkMemberInDB } from "../../../services/auth.service";
import moment from "moment";

interface Props {
  formik: any
}

export default function ThirdStep({ formik }: Props) {
  const route = all_routes;
  const [error, setError]= useState<any>([]);
  
  const searchMember= (index:number, searchText:any)=>{
      try {
        setTimeout(async ()=>{
           const errorData= [...error];
           const result:any= await checkMemberInDB(searchText);
           console.log(result)
           if(result?.status == 400){
              formik.setFieldValue(`siblingDetails[${index}].email`,"");
              formik.setFieldValue(`siblingDetails[${index}].name`,"");
              formik.setFieldValue(`siblingDetails[${index}].dob`,"");
              formik.setFieldValue('discount',10);
              errorData[index]= true;
           }
           if(result?.status == 200 && result?.data?.data){
             formik.setFieldValue(`siblingDetails[${index}].email`,result?.data?.data?.email);
             formik.setFieldValue(`siblingDetails[${index}].name`,result?.data?.data?.firstName + " " + result?.data?.data?.lastName);
             formik.setFieldValue(`siblingDetails[${index}].dob`,moment(result?.data?.data?.dob).format("YYYY-MM-DD"));
             formik.setFieldValue('discount',10);
             errorData[index]= false;
           }else{
            formik.setFieldValue(`siblingDetails[${index}].email`,"");
             formik.setFieldValue(`siblingDetails[${index}].name`,"");
             formik.setFieldValue(`siblingDetails[${index}].dob`,"");
             formik.setFieldValue('discount',10);
             errorData[index]= true;
           }
           setError(errorData);
        },300)
      } catch (error) {
        console.log(error)
      }
  }

  const hasError= ()=>{
    if(formik?.values?.subscription == 'family'){
      return formik?.values?.siblingDetails?.some((s:any)=>!s?.email)|| error.includes(true);
    }else{
      return false;
    }
  }

  
  return (
    <div className="authForm d-flex flex-column justify-content-between">
      <div className="authFormInner">
        <div className="formWrapper  text-center">
          <div className="title-dec mb-3">
            <ul className="steps my-5">
              <li className="active"></li>
              <li className="active"></li>
              <li></li>
            </ul>
            <p className="mb-0">{LANG.REGISTER_PLAN_MSG}</p>
          </div>
          <form autoComplete="off" onSubmit={formik.handleSubmit} >
            <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "individual" && "border border-primary")}
              onClick={() => formik.setFieldValue("subscription", "individual")} >
              <div className="planBox">
                <div className="icon_price d-flex justify-content-between align-items-center">
                  <span><SendSquareIcon /></span>
                  <h2 className="planPrice">€329</h2>
                </div>
                <div className="planBlockContent">
                  <h4>{LANG.INDIVIDUAL_YOUTH_MEMBERSHIP}</h4>
                  <p className="mb-0">Aut sunt quaerat sunt aspernatur consequuntur.</p>
                </div>
                <div className="backgroundColor"></div>
              </div>
            </div>
            <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "family" && "border border-primary")} onClick={() => formik.setFieldValue("subscription", "family")}>
              <div className="planBox">
                <div className="icon_price d-flex justify-content-between align-items-center">
                  <span><SendSquareIcon /></span>
                  <h2 className="planPrice">€329 <span className="text-decoration-line-through">€280</span></h2>
                </div>
                <div className="planBlockContent">
                  <h4>{LANG.FAMILY_PLAN}</h4>
                  <p className="mb-0">Tempora amet rem saepe et quos numquam est veritatis.</p>
                </div>
                <div className="backgroundColor"></div>
              </div>
            </div>
            <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "special" && "border border-primary")} onClick={() => formik.setFieldValue("subscription", "special")}>
              <div className="planBox">
                <div className="icon_price d-flex justify-content-between align-items-center">
                  <span><IcosahedronIcon /></span>
                  <h2 className="planPrice">€169 <span className="text-decoration-line-through">€189</span></h2>
                </div>
                <div className="planBlockContent">
                  <h4>{LANG.SPECIAL_PLAN}</h4>
                  <p className="mb-0">Sed beatae non et at.</p>
                </div>
                <div className="backgroundColor"></div>
              </div>
            </div>
            <div className="text-start">
              <ErrorText show={formik.errors.subscription} message={formik.errors?.subscription} />
            </div>

            <VisibilityBox show={formik?.values?.subscription == 'family'}>
              <div className="mb-3 text-start">
                <label className="mb-2">{LANG.SIBLING_DETAILS}</label>
              </div>
              {
                formik.values?.siblingDetails?.map((sibling: any, index: number) =>
                  <React.Fragment key={index}>
                    <div className="mb-1 text-start">
                      <div className="d-flex gap-1">
                        <div className="form-group col-md-6" >
                          <input
                            type="text"
                            placeholder={LANG.MEMBER_EMAIL}
                            defaultValue={sibling?.email}
                            autoComplete="off"
                            maxLength={100}
                            onChange={(event)=>{
                              searchMember(index, event.target.value);
                            }}
                            className={clsx(
                              "commonInput form-control",
                              { "border border-danger": false },
                            )}
                          />
                          <ErrorText show={error[index]} message={LANG.INVALID_MEMBER_ID} />
                        </div>
                        <div className="form-group col-md-6" >
                          <input
                            type="text"
                            readOnly={true}
                            placeholder={LANG.NAME}
                            autoComplete="off"
                            {...formik.getFieldProps(`siblingDetails[${index}].name`)}
                            className={clsx(
                              "commonInput form-control",
                              { "border border-danger": false },
                            )}
                          />
                        </div>
                      </div>
                      <div className="d-flex gap-1">
                        <div className="form-group col-md-6" >
                          <input
                            type="date"
                            placeholder={LANG.BIRTHDAY}
                            readOnly={true}
                            {...formik.getFieldProps(`siblingDetails[${index}].dob`)}
                            className={clsx(
                              "commonInput form-control",
                              { "border border-danger": false },
                            )}
                          />
                        </div>
                        <div className="form-group col-md-6">
                           <VisibilityBox show={index>0}>
                              <button type="button" onClick={()=>{
                                formik.values?.siblingDetails.splice(index,1)
                                formik.setFieldValue('siblingDetails',formik.values?.siblingDetails)
                              }
                              } className="btn p-2 mt-3 text-sm btn-danger" style={{fontSize:12}}>Delete</button>
                           </VisibilityBox>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              }
            <Form.Group className="mb-3 flex-start d-flex">
              <Button type="button" className="addRelationBtn" onClick={()=>formik.setFieldValue('siblingDetails',
              [...formik.values.siblingDetails,{email:"",name: "",dob: ""}])}><span>+</span>{LANG.ADD_SIBLING}</Button>
            </Form.Group>
            </VisibilityBox>
            <div className="mb-3">
              <div className="form-check d-flex justify-content-between checkLink">
                <input
                  type="checkbox"
                  id="custom-switcher"
                  checked={formik.values.privacyPolicy}
                  {...formik.getFieldProps("privacyPolicy")}
                  className={clsx(
                    "form-check-input",
                    { "border border-danger": formik.touched.privacyPolicy && formik.errors.privacyPolicy },
                  )}
                />
                <label className="text-start ps-2">{LANG.PRIVACY_HEADING}<br />
                  {LANG.PRIVACY_MSG} <a href="https://www.kv-muehlheim.de/datenschutz">{LANG.PRIVACY_POLICY}</a>.
                </label>
              </div>
              <div className="text-start">
                <ErrorText show={formik.touched.privacyPolicy && formik.errors.privacyPolicy} message={formik.errors?.privacyPolicy} />
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check d-flex justify-content-between checkLink">
                <input
                  type="checkbox"
                  id="custom-switcher"
                  checked={formik.values.dataPolicy}
                  {...formik.getFieldProps("dataPolicy")}
                  className={clsx(
                    "form-check-input",
                    { "border border-danger": formik.touched.dataPolicy && formik.errors.dataPolicy },
                  )}
                />
                <label className="text-start ps-2">{LANG.DATA_POCILY_HEADING}
                  <br />
                  {LANG.DATA_POLICY_MSG}
                </label>
              </div>
              <div className="text-start">
                <ErrorText show={formik.touched.dataPolicy && formik.errors.dataPolicy} message={formik.errors?.dataPolicy} />
              </div>
            </div>
            <div className="form-check d-flex justify-content-start align-items-center policy">
              <div className="d-inline-block">
                <input
                  type="checkbox"
                  id="policy"
                  checked={formik.values.termAndCondition}
                  {...formik.getFieldProps("termAndCondition")}
                  className={clsx(
                    "form-check-input",
                    { "border border-danger": formik.touched.termAndCondition && formik.errors.termAndCondition },
                  )}
                />
              </div>
              <label
                className="form-check-label"
                htmlFor="policy"
              >
                <Link to={route.termsCondition}>
                  {LANG.TERMS_AND_CONDITION}
                </Link>
              </label>
            </div>
            <div className="text-start">
              <ErrorText show={formik.touched.termAndCondition && formik.errors.termAndCondition} message={formik.errors?.termAndCondition} />
            </div>
            <div className="mt-4">
              <button
                disabled={hasError()}
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                {LANG.UPLOAD_DOCUMENT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
