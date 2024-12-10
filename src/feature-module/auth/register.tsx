import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import FirstStep from "./register-steps/FirstStep";
import SecondStep from "./register-steps/SecondStep";
import ThirdStep from "./register-steps/ThirdStep";
import FourthStep from "./register-steps/FourthStep";
import PaymentUnsuccessful from "./register-steps/PaymentUnsuccessful";
import PaymentSuccessful from "./register-steps/PaymentSuccessful";
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityBox from "../../core/components/VisibilityBox";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getAge, getFormData } from "../../utils";
import { LANG } from "../../constants/language";
import { ARGENTINA_NATIONALITY, ISTUPNICA_OR_BRISOVNICA_NATIONALITY } from "../../constants";

const registerSchema = Yup.object().shape({
  type: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  lastClub: Yup.string().test(
    'lastClubRequiredIfTypeIsVereinswechsel',
    LANG.FIELD_IS_REQUIRED,
    function (value) {
      const { type } = this.parent;
      if (type === 'Vereinswechsel') {
        return Boolean(value);
      }
      return true;
    }
  ),
  firstName: Yup.string().required(LANG.FIRSTNAME_IS_REQUIRED),
  lastName: Yup.string().required(LANG.LASTNAME_IS_REQUIRED),
  street: Yup.string().required(LANG.STREET_IS_REQUIRED),
  houseNumber: Yup.string().required(LANG.HOUSE_NO_IS_REQUIRED),
  zipCode: Yup.number().test('len', LANG.ZIPCODE_MUST_BE_FIVE_CHAR, (val:any) => val.toString().length === 5).required(LANG.ZIP_CODE_IS_REQUIRED),
  city: Yup.string().required(LANG.CITY_IS_REQUIRED),
  dob: Yup.date().required(LANG.BIRETHDATE_IS_REQUIRED),
  gender: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  birthPlaceCity: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  birthPlaceCountry: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  nationality: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  email: Yup.string().email(LANG.PLEASE_ADD_VALID_EMAIL).required(LANG.EMAIL_IS_REQUIRED),
  password: Yup.string().required(LANG.PASSWORD_IS_REQUIRED),
  confirmPassword: Yup.string().required(LANG.CONFIRM_PASSWORD_IS_REQUIRED).oneOf([Yup.ref('password')],LANG.PASSWORD_MUST_MATCH),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13,LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).required(LANG.FIELD_IS_REQUIRED),
});

const parentDetailSchema:any = Yup.object().shape({
  parentFirstName: Yup.string(),
  parentLastName: Yup.string(),
  parentEmail: Yup.string().email(LANG.PLEASE_ADD_VALID_EMAIL),
  parentPhone: Yup.string(),
  parentRelation: Yup.string(),
  bankName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  iban: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  bic: Yup.string().min(8, LANG.MINIMUM_LIMIT_BIC_CHAR).max(11,LANG.MAXIMUM_LIMIT_BIC_CHAR).required(LANG.FIELD_IS_REQUIRED),
  accountHolder: Yup.string().required(LANG.FIELD_IS_REQUIRED),
});

const subscriptionSchema = Yup.object().shape({
  subscription: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  privacyPolicy: Yup.bool().oneOf([true],LANG.FIELD_IS_REQUIRED).required(LANG.FIELD_IS_REQUIRED),
  dataPolicy: Yup.bool().oneOf([true],LANG.FIELD_IS_REQUIRED).required(LANG.FIELD_IS_REQUIRED),
  termAndCondition: Yup.bool().oneOf([true],LANG.FIELD_IS_REQUIRED).required(LANG.FIELD_IS_REQUIRED),
});


const uploadFileSchema:any = Yup.object().shape({
  matchPermissionDoc: Yup.mixed(),
  clubTransferDoc: Yup.mixed(),
  doctorCerificateDoc: Yup.mixed(),
  birthCertificateDoc: Yup.mixed(),
  residenceCertificateDoc: Yup.mixed(),
  playersParentDeclarationDoc: Yup.mixed(),
  copyOfPassportDoc: Yup.mixed(),
  attachmentArgentinaDoc: Yup.mixed(),
  attachmentIstupnicaDoc: Yup.mixed(),
  attachmentBrisovnicaDoc: Yup.mixed()
});

const registerInitialValues = {
  type:"",
  firstName:"",
  lastName:"",
  phone:"",
  dob:"",
  email: "",
  password: "",
  nationality:""
};

const Signin = () => {
  const navigate= useNavigate();
  const route = all_routes;
  const [step,setStep]= useState<number>(1);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(2);
        if(getAge(values.dob)< 18){
          parentDetailSchema.fields.parentFirstName = parentDetailSchema.fields.parentFirstName.required(LANG.FIRSTNAME_IS_REQUIRED);
          parentDetailSchema.fields.parentLastName = parentDetailSchema.fields.parentLastName.required(LANG.LASTNAME_IS_REQUIRED);
          parentDetailSchema.fields.parentEmail = parentDetailSchema.fields.parentEmail.email(LANG.PLEASE_ADD_VALID_EMAIL).required(LANG.EMAIL_IS_REQUIRED);
          parentDetailSchema.fields.parentPhone = parentDetailSchema.fields.parentPhone.min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13,LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).required(LANG.FIELD_IS_REQUIRED);
        }else{
          parentDetailSchema.fields.parentFirstName = Yup.string();
          parentDetailSchema.fields.parentLastName = Yup.string();
          parentDetailSchema.fields.parentEmail = Yup.string().email();
          parentDetailSchema.fields.parentPhone = Yup.string();
        }
        // validation for match permission doc
        if(values.type == "Erstmalige Spielerlaubnis"){
          uploadFileSchema.fields.matchPermissionDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.matchPermissionDoc= Yup.mixed();
        }
        // validation for club transfer doc
        if(values.type == "Vereinswechsel"){
          uploadFileSchema.fields.clubTransferDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.clubTransferDoc= Yup.mixed();
        }
        // validation for doctor & birth certificate doc
        if(values.type == "Erstmalige Spielerlaubnis" && getAge(values.dob)< 18){
          uploadFileSchema.fields.doctorCerificateDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
          uploadFileSchema.fields.birthCertificateDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.doctorCerificateDoc= Yup.mixed();
          uploadFileSchema.fields.birthCertificateDoc= Yup.mixed();
        }

        // residence & players parent certification
        if(values.nationality == "Dutch" && getAge(values.dob)> 10 && getAge(values.dob)< 18){
          uploadFileSchema.fields.residenceCertificateDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
          uploadFileSchema.fields.playersParentDeclarationDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.residenceCertificateDoc= Yup.mixed();
          uploadFileSchema.fields.playersParentDeclarationDoc= Yup.mixed();
        }

        // copy of passport
        if(values.nationality == "Dutch" && getAge(values.dob)> 10 ){
          uploadFileSchema.fields.copyOfPassportDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.copyOfPassportDoc= Yup.mixed();
        }

        // Application Attachment Argentina

        if(ARGENTINA_NATIONALITY.includes(values.nationality)){
          uploadFileSchema.fields.attachmentArgentinaDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.attachmentArgentinaDoc= Yup.mixed();
        }

        //  Application Attachment Istupnica & Brisovnica

        if(ISTUPNICA_OR_BRISOVNICA_NATIONALITY.includes(values.nationality)){
          uploadFileSchema.fields.attachmentIstupnicaDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
          uploadFileSchema.fields.attachmentBrisovnicaDoc= Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
        }else{
          uploadFileSchema.fields.attachmentIstupnicaDoc= Yup.mixed();
          uploadFileSchema.fields.attachmentBrisovnicaDoc= Yup.mixed();
        }

      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const parentDetailFormik = useFormik({
    initialValues:{},
    validationSchema: parentDetailSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(3);
        console.log(values);
        setSubmitting(true)
      } catch (error) {
        console.log(error)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const subscriptionFormik = useFormik({
    initialValues:{
      subscription: "",
      privacyPolicy: false,
      dataPolicy: false,
      termAndCondition: false,
      siblingDetails:[
        {
          email:"",
          name: "",
          dob: ""
        }
      ]
    },
    validationSchema: subscriptionSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(4);
        console.log(values);
        
      } catch (error) {
        console.log(error)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const uploadFormik = useFormik({
    initialValues:{},
    validationSchema: uploadFileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const payload:any= {
          ...formik.values,
          ...parentDetailFormik.values,
          ...subscriptionFormik.values,
          ...values,
          siblingDetails: JSON.stringify(subscriptionFormik.values.siblingDetails)
        }

        const formData= getFormData(payload);
        const result = await registerUser(formData);
        if(result.status == 200){
          toast.success(LANG.REGISTRATION_SUCCESSFULLY_DONE);
          navigate(route.login);
        }else if(result.status == 404){
          console.log(result.data);
        }
        setSubmitting(false);
        setLoading(false);
      } catch (error) {
        if(error instanceof AxiosError){
          toast.error(error.response?.data?.responseMessage)
        }
        console.log(error)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const renderLayout=(activeStep:number)=>{
     switch(activeStep){    
        case 1: {
            return <FirstStep formik={formik} />;
        }
        case 2: {
            return <SecondStep formik={parentDetailFormik} registerValue={formik.values} />;
        }
        case 3: {
            return <ThirdStep formik={subscriptionFormik}/>;
        }
        case 4: {
            return <FourthStep formik={uploadFormik} registerValue={formik.values}  />;
        }
        case 5: {
            return <PaymentUnsuccessful/>;
        }
        case 6: {
            return <PaymentSuccessful/>;
        }
     }
  }


  return (
    <div>
      <>
        {/* Main Wrapper */}
        <div className="main-wrapper authendication-pages">
          {/* Page Content */}
          <div className="content">
            <div className="container wrapper no-padding">
              <div className="row no-margin vph-100">
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 no-padding">
                  <div className="dull-pg">
                    <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                      <div className="col-sm-10 col-md-10 col-lg-10 mx-auto mb-2">
                        <header className="text-center">
                            <ImageWithBasePath
                              src="assets/img/logo.png"
                              className="img-fluid"
                              alt="Logo"
                            />
                        </header>
                        {renderLayout(step)}
                      </div>
                      <VisibilityBox show={step>1}>
                         <div className="mb-4 text-center">
                                <span className="cursor-pointer" onClick={()=>setStep(step-1)}>
                                <i className="feather-arrow-left-circle ms-2" /> {LANG.BACK}</span>
                         </div>
                      </VisibilityBox>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-7 no-padding">
                  <div className="banner-bg register">
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
        {/* /Main Wrapper */}
      </>
    </div>
  );
};

export default Signin;
