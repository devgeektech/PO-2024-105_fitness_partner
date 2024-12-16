import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LANG } from "../../constants/language";
import StepFirst from "./register-steps/stepFirst";
import StepSecond from "./register-steps/stepSecond";
import StepThird from "./register-steps/stepThird"
import StepFour from "./register-steps/stepFour"
import StepSix from "./register-steps/stepSix";
import { registerFirstStep, verifyOtp } from "../../services/onBoardingService";
import StepFive from "./register-steps/stepFive";

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

const stepSecondInitialValues = {
 otp : ""
}

const stepFiveInitialValues = {}

const stepThirdInitialValues = {
  wellnessTypeId : ""
}

const stepFirstRegisterSchema = Yup.object().shape({
  name: Yup.string().required("Field is required"),
  businessName: Yup.string().required("Bussiness name is required"),
  email: Yup.string().email("Please add valid email").required(),
  businessWebsite: Yup.string(),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13,LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).required(LANG.FIELD_IS_REQUIRED),
});

const stepSecondRegisterSchema = Yup.object().shape({
}); 

const stepFiveRegisterSchema = Yup.object().shape({});

const stepThirdRegisterSchema = Yup.object().shape({
  wellnessTypeId: Yup.string().required("Field is required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [step,setStep]= useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [submitDetails, setSubmitDetails] = useState({
    name:"",
    businessName : "",
    email: "",
    businessWebsite : "",
    phone : ""
  })
  const [wellnessTypeId, setWellnessTypeId] = useState(""); 

  const stepOneFormik = useFormik({
    initialValues: stepFirstInitialValues,
    validationSchema: stepFirstRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const result = await registerFirstStep(values);
        if(result.status == 200){
          toast.success("Business details saved");
          let state = {...submitDetails, ...values}
          setSubmitDetails(state)
          setStep(2);
        }else if(result.status == 404){
          toast.error("Something went wrong");
        }
      
      } catch (error:any) {
        if(error?.response?.data?.responseCode == 400){
          toast.error(error?.response?.data?.responseMessage);
        }
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSecondFormik = useFormik({
    initialValues: stepSecondInitialValues,
    validationSchema: stepSecondRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const otpString = otp.join("");
        if (otpString.length === 4 && submitDetails.email != '') {
          const result:any = await verifyOtp({email: submitDetails.email, otp: otpString});
          if(result.status == 200){
            toast.success("Otp Verified Successfully");
            setStep(3);
          }
          setOtp(["", "", "", ""]);
        } 
      } catch (error:any) {
        if(error?.response?.data?.responseCode == 400){
          toast.error(error?.response?.data?.responseMessage);
        }
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepThirdFormik = useFormik({
    initialValues:stepThirdInitialValues,
    validationSchema: stepThirdRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value:", values);

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
        setStep(5);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSixFormik = useFormik({
    initialValues:registerInitialValues,
    validationSchema: stepFirstRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value:", values);

      setLoading(true);
      try {
        setStep(6);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepFiveFormik = useFormik({
    initialValues: stepFiveInitialValues,
    validationSchema: stepFiveRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value:", values);
      setLoading(true);
      try {
        setStep(4);
      } catch (error) {
        console.log(error,loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });``

  const renderLayout=(activeStep:number)=>{
    // console.log('activeStep ========= ',activeStep);
    
     switch(activeStep){    
        case 1: {
            return <StepFirst formik={stepOneFormik} />;
        }
        case 2: {
            return <StepSecond formik={stepSecondFormik} otp={otp} setOtp={setOtp} />;
        }
        case 3: {
            return <StepThird formik={stepThirdFormik}  wellnessTypeId={wellnessTypeId} setWellnessTypeId={setWellnessTypeId}/>;
        }
        case 4: {
            return <StepFour formik={stepFourFormik} />;
        }
        case 5: {
            return <StepFive formik={stepFiveFormik} />;
        }
        case 6: {
            return <StepSix formik={stepSixFormik} />;
        }
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
