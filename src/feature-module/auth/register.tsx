import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ThirdStep from "./register-steps/ThirdStep";
import FourthStep from "./register-steps/FourthStep";
import PaymentUnsuccessful from "./register-steps/PaymentUnsuccessful";
import PaymentSuccessful from "./register-steps/PaymentSuccessful";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getAge, getFormData } from "../../utils";
import { LANG } from "../../constants/language";
import StepFirst from "./register-steps/stepFirst";
import StepSecond from "./register-steps/stepSecond";
import StepThird from "./register-steps/stepThird"
import StepFour from "./register-steps/stepFour"
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

  const stepOneFormik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(2);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSecondFormik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(3);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepThirdFormik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(4);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepFourFormik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(4);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const renderLayout=(activeStep:number)=>{
     switch(activeStep){    
        case 1: {
            return <StepFirst formik={stepOneFormik} />;
        }
        case 2: {
            return <StepSecond formik={stepSecondFormik}/>;
        }
        case 3: {
            return <StepThird formik={stepThirdFormik}/>;
        }
        case 4: {
            return <StepFour formik={stepFourFormik} />;
        }
        // case 5: {
        //     return <PaymentUnsuccessful/>;
        // }
        // case 6: {
        //     return <PaymentSuccessful/>;
        // }
     }
  }

  return (
    <div>
      <>
      {renderLayout(step)}
      </>
    </div>
  );
};

export default Signin;
