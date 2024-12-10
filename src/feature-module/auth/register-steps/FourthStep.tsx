import React from "react";
import { FOURTH_STEP_SIGNUP_CONTENT } from "../../../constants/utlis";
import UploadIcon from "../../../icons/UploadIcon";
import VisibilityBox from "../../../core/components/VisibilityBox";
import { getAge } from "../../../utils";
import { ARGENTINA_NATIONALITY, FILE_EXT, ISTUPNICA_OR_BRISOVNICA_NATIONALITY } from "../../../constants";
import { LANG } from "../../../constants/language";
import ErrorText from "../../../core/components/error-text";
import { toast } from "react-toastify";
interface Props {
  formik: any,
  registerValue: any
}

export default function FourthStep({ formik, registerValue }: Props) {
  console.log(formik.values)
  return (
    <div className="authForm d-flex flex-column justify-content-between">
      <div className="authFormInner">
        <div className="formWrapper  text-center">
          <div className="title-dec mb-3">
            <ul className="steps my-5">
              <li className="active"></li>
              <li className="active"></li>
              <li className="active"></li>
            </ul>
            <p className="mb-0">{FOURTH_STEP_SIGNUP_CONTENT}</p>
          </div>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            {
              registerValue.type == "Erstmalige Spielerlaubnis" ? <>
                <div className="my-3 form-control">
                  <label className="d-inline">
                    <div className="fileUpload form-group mb-1" >
                      <input className="d-none" accept={FILE_EXT} id="matchPermissionDoc" type="file"
                        name="matchPermissionDoc"
                        onChange={(ev: any) => {
                          const file = ev.target.files[0]; // Access the selected file
                          const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("matchPermissionDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
                        }}
                      />
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <span className="text-black"> {formik.values?.matchPermissionDoc ? formik.values?.matchPermissionDoc?.name : LANG.APPLICATION_FOR_MATCH_PERMISSIONS}</span>
                        <span className="iconWrap"><UploadIcon /></span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="text-start">
                  <ErrorText show={formik.errors.matchPermissionDoc} message={formik.errors?.matchPermissionDoc} />
                </div>
              </> : <>
                <div className="my-3 form-control">
                  <label className="d-inline">
                    <div className="fileUpload form-group mb-1" >
                      <input className="d-none" accept={FILE_EXT} id="clubTransferDoc" type="file"
                        name="clubTransferDoc"
                        onChange={(ev: any) => {
                          const file = ev.target.files[0]; // Access the selected file
                          const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("clubTransferDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
                        }}
                      />
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <span className="text-black">
                          {formik.values?.clubTransferDoc ? formik.values?.clubTransferDoc?.name : LANG.APPLICATION_FOR_CLUB_TRANSFER}                       </span>
                        <span className="iconWrap"><UploadIcon /></span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="text-start">
                  <ErrorText show={formik.errors.clubTransferDoc} message={formik.errors?.clubTransferDoc} />
                </div>
              </>
            }
            <VisibilityBox show={registerValue?.type == 'Erstmalige Spielerlaubnis' && getAge(registerValue?.dob) < 18}>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="doctorCerificateDoc" type="file"
                      name="doctorCerificateDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("doctorCerificateDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
            
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black"> {formik.values?.doctorCerificateDoc ? formik.values?.doctorCerificateDoc?.name : LANG.DOCTOR_CERTIFICATE}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.doctorCerificateDoc} message={formik.errors?.doctorCerificateDoc} />
              </div>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="birthCertificateDoc" type="file"
                      name="birthCertificateDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                        if (file && allowedTypes.includes(file.type)) {
                          formik.setFieldValue("birthCertificateDoc", ev.target.files[0]);
                        } else {
                          toast.error(LANG.INVALID_DOCUMENT_TYPE)
                        }
                       
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.birthCertificateDoc ? formik.values?.birthCertificateDoc?.name : LANG.BIRTH_CERTIFICATE}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.birthCertificateDoc} message={formik.errors?.birthCertificateDoc} />
              </div>
            </VisibilityBox>
            <VisibilityBox show={registerValue?.nationality == 'Dutch' && getAge(registerValue?.dob) > 10 && getAge(registerValue?.dob) < 18}>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="residenceCertificateDoc" type="file"
                      name="residenceCertificateDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("residenceCertificateDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
                        
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.residenceCertificateDoc ? formik.values?.residenceCertificateDoc?.name : LANG.RESIDENCE_CERTIFICATION}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.residenceCertificateDoc} message={formik.errors?.residenceCertificateDoc} />
              </div>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="playersParentDeclarationDoc" type="file"
                      name="playersParentDeclarationDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("playersParentDeclarationDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
                        
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.playersParentDeclarationDoc ? formik.values?.playersParentDeclarationDoc?.name : LANG.PLAYER_PARENTS_DECLARATION}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.playersParentDeclarationDoc} message={formik.errors?.playersParentDeclarationDoc} />
              </div>
              
            </VisibilityBox>
            <VisibilityBox show={registerValue?.nationality == 'Dutch' && getAge(registerValue?.dob) > 10}>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="copyOfPassportDoc" type="file"
                      name="copyOfPassportDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                        if (file && allowedTypes.includes(file.type)) {
                          formik.setFieldValue("copyOfPassportDoc", ev.target.files[0]);
                        } else {
                          toast.error(LANG.INVALID_DOCUMENT_TYPE)
                        }
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black"> {formik.values?.copyOfPassportDoc ? formik.values?.copyOfPassportDoc?.name : LANG.COPY_OF_PASSPORT}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.copyOfPassportDoc} message={formik.errors?.copyOfPassportDoc} />
              </div>
            </VisibilityBox>
            <VisibilityBox show={ARGENTINA_NATIONALITY.includes(registerValue?.nationality)}>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="attachmentArgentinaDoc" type="file"
                    name="attachmentArgentinaDoc"
                    onChange={(ev: any) => {
                      const file = ev.target.files[0]; // Access the selected file
                      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                          if (file && allowedTypes.includes(file.type)) {
                            formik.setFieldValue("attachmentArgentinaDoc", ev.target.files[0]);
                          } else {
                            toast.error(LANG.INVALID_DOCUMENT_TYPE)
                          }
                    }}
                     />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.attachmentArgentinaDoc ? formik.values?.attachmentArgentinaDoc?.name : LANG.APPLICATION_ATTACHMENT_ARGETINA}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.attachmentArgentinaDoc} message={formik.errors?.attachmentArgentinaDoc} />
              </div>
            </VisibilityBox>
            <VisibilityBox show={ISTUPNICA_OR_BRISOVNICA_NATIONALITY.includes(registerValue?.nationality)}>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="attachmentIstupnicaDoc" type="file"
                      name="attachmentIstupnicaDoc"
                      onChange={(ev: any) => {
                        const file = ev.target.files[0]; // Access the selected file
                        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                        if (file && allowedTypes.includes(file.type)) {
                          formik.setFieldValue("attachmentIstupnicaDoc", ev.target.files[0]);
                        } else {
                          toast.error(LANG.INVALID_DOCUMENT_TYPE)
                        }
                      }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.attachmentIstupnicaDoc ? formik.values?.attachmentIstupnicaDoc?.name : LANG.APPLICATION_ATTACHMENT_ISTUPNICA}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.attachmentIstupnicaDoc} message={formik.errors?.attachmentIstupnicaDoc} />
              </div>
              <div className="my-3 form-control">
                <label className="d-inline">
                  <div className="fileUpload form-group mb-1" >
                    <input className="d-none" accept={FILE_EXT} id="attachmentBrisovnicaDoc" type="file"
                    name="attachmentBrisovnicaDoc"
                     onChange={(ev: any) => {
                      const file = ev.target.files[0]; // Access the selected file
                      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
                      if (file && allowedTypes.includes(file.type)) {
                        formik.setFieldValue(
                          "attachmentBrisovnicaDoc",
                          ev.target.files[0]
                        );
                      } else {
                        toast.error(LANG.INVALID_DOCUMENT_TYPE)
                      }
                    }}
                    />
                    <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                      <span className="text-black">{formik.values?.attachmentBrisovnicaDoc ? formik.values?.attachmentBrisovnicaDoc?.name : LANG.APPLICATION_ATTACHMENT_BRISOVNICA}
                      </span>
                      <span className="iconWrap"><UploadIcon /></span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="text-start">
                  <ErrorText show={formik.errors.attachmentBrisovnicaDoc} message={formik.errors?.attachmentBrisovnicaDoc} />
              </div>
            </VisibilityBox>
            <div className="mt-4">
              <button
                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                type="submit"
              >
                {LANG.SUBMIT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
