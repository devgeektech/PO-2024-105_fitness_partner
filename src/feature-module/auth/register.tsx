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

const stepFirstInitialValues = {
  name: "", 
  businessName : "",
  email: "",
  businessWebsite : "",
  phone : ""
}

const stepFirstRegisterSchema = Yup.object().shape({
  name: Yup.string().required("Field is required"),
  businessName: Yup.string().required("Bussiness name is required"),
  email: Yup.string().email("Please add valid email").required(),
  businessWebsite: Yup.string(),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13,LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).required(LANG.FIELD_IS_REQUIRED),
});

const Signin = () => {
  const navigate= useNavigate();
  const route = all_routes;
  const [step,setStep]= useState<number>(1);
  const [loading, setLoading] = useState(false);

  const stepOneFormik = useFormik({
    initialValues: stepFirstInitialValues,
    validationSchema: stepFirstRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        console.log("working", values)

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
    validationSchema: stepFirstRegisterSchema,
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
    validationSchema: stepFirstRegisterSchema,
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
    validationSchema: stepFirstRegisterSchema,
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
