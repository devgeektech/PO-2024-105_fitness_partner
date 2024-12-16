import React, { useState } from "react";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import KeyIcon from "../../../icons/KeyIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LANG } from "../../../constants/language";
import UserIcon from "../../../icons/UserIcon";
import BusinessIcon from "../../../icons/BusinessIcon";
import EmailIcon from "../../../icons/EmailIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
const StepZero = ({fromik}:any) => {
  const routes = all_routes;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


const registerInitialValues = {
  type: "",
  firstName: "",
  lastName: "",
  phone: "",
  dob: "",
  email: "",
  password: "",
  nationality: "",
};

const registerSchema = Yup.object().shape({
  type: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  lastClub: Yup.string().test(
    "lastClubRequiredIfTypeIsVereinswechsel",
    LANG.FIELD_IS_REQUIRED,
    function (value) {
      const { type } = this.parent;
      if (type === "Vereinswechsel") {
        return Boolean(value);
      }
      return true;
    }
  ),
  firstName: Yup.string().required(LANG.FIRSTNAME_IS_REQUIRED),
  lastName: Yup.string().required(LANG.LASTNAME_IS_REQUIRED),
  street: Yup.string().required(LANG.STREET_IS_REQUIRED),
  houseNumber: Yup.string().required(LANG.HOUSE_NO_IS_REQUIRED),
  zipCode: Yup.number()
    .test(
      "len",
      LANG.ZIPCODE_MUST_BE_FIVE_CHAR,
      (val: any) => val.toString().length === 5
    )
    .required(LANG.ZIP_CODE_IS_REQUIRED),
  city: Yup.string().required(LANG.CITY_IS_REQUIRED),
  dob: Yup.date().required(LANG.BIRETHDATE_IS_REQUIRED),
  gender: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  birthPlaceCity: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  birthPlaceCountry: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  nationality: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  email: Yup.string()
    .email(LANG.PLEASE_ADD_VALID_EMAIL)
    .required(LANG.EMAIL_IS_REQUIRED),
  password: Yup.string().required(LANG.PASSWORD_IS_REQUIRED),
  confirmPassword: Yup.string()
    .required(LANG.CONFIRM_PASSWORD_IS_REQUIRED)
    .oneOf([Yup.ref("password")], LANG.PASSWORD_MUST_MATCH),
  phone: Yup.string()
    .min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR)
    .max(13, LANG.MAXIMUM_LIMIT_HUNDRED_CHAR)
    .required(LANG.FIELD_IS_REQUIRED),
});
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // setLoading(true);
      // try {
      //   setStep(2);
      //   if (getAge(values.dob) < 18) {
      //     parentDetailSchema.fields.parentFirstName =
      //       parentDetailSchema.fields.parentFirstName.required(
      //         LANG.FIRSTNAME_IS_REQUIRED
      //       );
      //     parentDetailSchema.fields.parentLastName =
      //       parentDetailSchema.fields.parentLastName.required(
      //         LANG.LASTNAME_IS_REQUIRED
      //       );
      //     parentDetailSchema.fields.parentEmail =
      //       parentDetailSchema.fields.parentEmail
      //         .email(LANG.PLEASE_ADD_VALID_EMAIL)
      //         .required(LANG.EMAIL_IS_REQUIRED);
      //     parentDetailSchema.fields.parentPhone =
      //       parentDetailSchema.fields.parentPhone
      //         .min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR)
      //         .max(13, LANG.MAXIMUM_LIMIT_HUNDRED_CHAR)
      //         .required(LANG.FIELD_IS_REQUIRED);
      //   } else {
      //     parentDetailSchema.fields.parentFirstName = Yup.string();
      //     parentDetailSchema.fields.parentLastName = Yup.string();
      //     parentDetailSchema.fields.parentEmail = Yup.string().email();
      //     parentDetailSchema.fields.parentPhone = Yup.string();
      //   }
      //   // validation for match permission doc
      //   if (values.type == "Erstmalige Spielerlaubnis") {
      //     uploadFileSchema.fields.matchPermissionDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //   } else {
      //     uploadFileSchema.fields.matchPermissionDoc = Yup.mixed();
      //   }
      //   // validation for club transfer doc
      //   if (values.type == "Vereinswechsel") {
      //     uploadFileSchema.fields.clubTransferDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //   } else {
      //     uploadFileSchema.fields.clubTransferDoc = Yup.mixed();
      //   }
      //   // validation for doctor & birth certificate doc
      //   if (
      //     values.type == "Erstmalige Spielerlaubnis" &&
      //     getAge(values.dob) < 18
      //   ) {
      //     uploadFileSchema.fields.doctorCerificateDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //     uploadFileSchema.fields.birthCertificateDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //   } else {
      //     uploadFileSchema.fields.doctorCerificateDoc = Yup.mixed();
      //     uploadFileSchema.fields.birthCertificateDoc = Yup.mixed();
      //   }

      //   // residence & players parent certification
      //   if (
      //     values.nationality == "Dutch" &&
      //     getAge(values.dob) > 10 &&
      //     getAge(values.dob) < 18
      //   ) {
      //     uploadFileSchema.fields.residenceCertificateDoc =
      //       Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
      //     uploadFileSchema.fields.playersParentDeclarationDoc =
      //       Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
      //   } else {
      //     uploadFileSchema.fields.residenceCertificateDoc = Yup.mixed();
      //     uploadFileSchema.fields.playersParentDeclarationDoc = Yup.mixed();
      //   }

      //   // copy of passport
      //   if (values.nationality == "Dutch" && getAge(values.dob) > 10) {
      //     uploadFileSchema.fields.copyOfPassportDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //   } else {
      //     uploadFileSchema.fields.copyOfPassportDoc = Yup.mixed();
      //   }

      //   // Application Attachment Argentina

      //   if (ARGENTINA_NATIONALITY.includes(values.nationality)) {
      //     uploadFileSchema.fields.attachmentArgentinaDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //   } else {
      //     uploadFileSchema.fields.attachmentArgentinaDoc = Yup.mixed();
      //   }

      //   //  Application Attachment Istupnica & Brisovnica

      //   if (ISTUPNICA_OR_BRISOVNICA_NATIONALITY.includes(values.nationality)) {
      //     uploadFileSchema.fields.attachmentIstupnicaDoc = Yup.mixed().required(
      //       LANG.FIELD_IS_REQUIRED
      //     );
      //     uploadFileSchema.fields.attachmentBrisovnicaDoc =
      //       Yup.mixed().required(LANG.FIELD_IS_REQUIRED);
      //   } else {
      //     uploadFileSchema.fields.attachmentIstupnicaDoc = Yup.mixed();
      //     uploadFileSchema.fields.attachmentBrisovnicaDoc = Yup.mixed();
      //   }
      // } catch (error) {
      //   console.log(error, loading);
      //   setSubmitting(false);
      //   setLoading(false);
      // }
    },
  });

  return (
    <>
     <div className="main-wrapper authendication-pages">
          {/* Page Content */}
          <div className="content">
            <div className="container wrapper no-padding">
              <div className="row no-margin vph-100">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 no-padding">
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
                        <div className="shadow-card">
                          <h2 className="text-center">
                            Grow your business with fitpond
                          </h2>
                          <p className="text-center">Apply to join our network for free.</p>
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
                                    <div className="group-img iconLeft  position-relative">
                                      <label><UserIcon/></label>
                                      <input
                                        type="text"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Your name"
                                      />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><BusinessIcon/></label>
                                      <input
                                        type="text"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Business name"
                                      />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><EmailIcon/></label>
                                      <input
                                        type="email"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Email"
                                      />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><GlobeIcon/></label>
                                      <input
                                        type="text"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Business website"
                                      />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><PhoneIcon/></label>
                                      <input
                                        type="text"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Phone number"
                                      />
                                    </div>
                                </div>

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
                            ></div>
                          </div>
                        </div>
                        <div className="bottom-text text-center">
                          <p> Already have an account?
                              <Link to={""}  className="text-underline">Sign in</Link>
                           </p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 no-padding">
                  <div className="banner-bg register">
                    <div className="row no-margin h-100">
                      <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                        <div className="h-100 d-flex justify-content-center align-items-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Content */}
        </div>
    </>
  );
};

export default StepZero;
