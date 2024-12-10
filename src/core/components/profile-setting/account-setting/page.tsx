import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./style.scss";
import EditCircleIcon from '../../../../icons/EditCircleIcon'
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { updateUserAvatarById, updateUserById } from '../../../../services/user.service';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../../data/redux/user/userSlice';
import moment from "moment";
import VisibilityBox from '../../VisibilityBox';
import UploadIcon from '../../../../icons/UploadIcon';
import DownloadIcon from '../../../../icons/DownloadIcon';
import { LANG } from '../../../../constants/language';
import { toast } from 'react-toastify';
import { alphaOnly, getAge, numOnly } from '../../../../utils';
import { NATIONALITIES } from '../../../../constants/nationalities';
import { BLOOD_GROUP_LIST, GENDERS } from '../../../../constants';
import ErrorText from '../../error-text';

const profileSchema:any = Yup.object().shape({
  firstName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  lastName: Yup.string().required("Last name is required"),
  street: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  houseNumber: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  zipCode: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  city: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  dob: Yup.date().required("Birth Date is required"),
  birthPlaceCity: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  birthPlaceCountry: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  nationality: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  gender: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  bloodGroup: Yup.string(),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  bankName: Yup.string().required("Bank name is required"),
  iban: Yup.string().required("IBAN is required"),
  bic: Yup.string().required("BIC is required"),
  accountHolder: Yup.string().required("Account Holder is required"),
  description: Yup.string().optional(),

  parentFirstName: Yup.string(),
  parentLastName: Yup.string(),
  parentEmail: Yup.string().email(LANG.PLEASE_ADD_VALID_EMAIL),
  parentPhone: Yup.string(),
  parentRelation: Yup.string(),
});
export default function AccountSetting({ userDetail }: any) {
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      ...userDetail,
      dob: moment(userDetail?.dob).format("YYYY-MM-DD")
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values, file);
        const result = await updateUserById({ ...values, role: JSON.stringify(values.role) });
        if (result.data) {
          console.log(result.data);
          dispatch(setUserDetail(result?.data?.data));
          toast.success(LANG.PROFILE_UPDATED_SUCCESSFULLY);
        }
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({ ...userDetail, dob: moment(userDetail?.dob).format("YYYY-MM-DD") });

    if(getAge(userDetail?.dob)< 18){
      profileSchema.fields.parentFirstName = profileSchema.fields.parentFirstName.required(LANG.FIRSTNAME_IS_REQUIRED);
      profileSchema.fields.parentLastName = profileSchema.fields.parentLastName.required(LANG.LASTNAME_IS_REQUIRED);
      profileSchema.fields.parentEmail = profileSchema.fields.parentEmail.email(LANG.PLEASE_ADD_VALID_EMAIL).required(LANG.EMAIL_IS_REQUIRED);
      profileSchema.fields.parentPhone = profileSchema.fields.parentPhone.min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13,LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).required(LANG.FIELD_IS_REQUIRED);
    }
  }, [userDetail?._id]);

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setImageUrl(url);
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    await updateUserAvatarById(formData);
  };

  const download = (filename: any) => {
    const a = document.createElement("a");
    a.href = process.env.REACT_APP_FILE_URL + filename;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <div className='accountSettingTab'>
      <h3 className='mb-3'>{LANG.EDIT_ACCOUNT_DETAILS}</h3>
      <div className='uploadImageWrapper mb-3'>
        <div className='uploadImg'>
          <div className='d-flex align-items-center flex-column profileImageChange'>
            <img src={userDetail?.avatar ? fileUrl + userDetail?.avatar : (imageUrl ? imageUrl : '/assets/img/default-avatar.png')} width={120} height={120} style={{ borderRadius: 60 }} alt="userCircle" />
          </div>
          <button className='uploaddBtn' type='button'><Form.Control onChange={handleChangeProfileImage} type="file" /><EditCircleIcon /></button>
        </div>
      </div>
      <div className='personalIformation bgFormColor p-4 formEditWrap mb-3'>
        <label>{LANG.PERSONAL_INFORMATION}</label>
        <Form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.FIRST_NAME}
                  readOnly={true}
                  {...formik.getFieldProps("firstName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.firstName && formik.errors.firstName },
                  )}
                />
              </Form.Group>
            </div>

            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.LAST_NAME}
                  readOnly={true}
                  {...formik.getFieldProps("lastName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.lastName && formik.errors.lastName },
                  )}
                />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='email' placeholder='Email'  {...formik.getFieldProps("email")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.email && formik.errors.email },
                  )}
                />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text'
                  placeholder={LANG.PHONE}
                  {...formik.getFieldProps("phone")}
                  onKeyPress={numOnly}
                  maxLength={11}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.phone && formik.errors.phone },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="date" placeholder={LANG.BIRTHDAY}
                  readOnly={true}
                  {...formik.getFieldProps("dob")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.dob && formik.errors.dob },
                  )}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea" 
            rows={3} 
            defaultValue='' 
            {...formik.getFieldProps("description")}
            name="description"
          /> 
          </Form.Group>


          <label>{LANG.ADDRESS}</label>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2} placeholder={LANG.STREET}
              {...formik.getFieldProps("street")}
              className={clsx(
                "addressTextarea",
                { "border border-danger": formik.touched.street && formik.errors.street },
              )} />
          </Form.Group>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text"
                  placeholder={LANG.HOUSE_NO}  {...formik.getFieldProps("houseNumber")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.houseNumber && formik.errors.houseNumber },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.ZIP_CODE} {...formik.getFieldProps("zipCode")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.CITY} {...formik.getFieldProps("city")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.city && formik.errors.city },
                  )} />
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.BIRTHPLACE_CITY}
                  {...formik.getFieldProps("birthPlaceCity")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.birthPlaceCity && formik.errors.birthPlaceCity },
                  )}
                />
              </Form.Group>
            </div>


            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text'  {...formik.getFieldProps("birthPlaceCountry")}
                  readOnly={true}
                  placeholder={LANG.BIRTHPLACE_COUNTRY}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.birthPlaceCountry && formik.errors.birthPlaceCountry },
                  )}
                />
              </Form.Group>
            </div>

            <div className="col-md-4 form-group">
              <div className="group-img">
                <select
                  {...formik.getFieldProps("nationality")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.nationality && formik.errors.nationality },
                  )}>
                  <option value={""}>{LANG.SELECT} {LANG.NATIONALITY}</option>
                  {NATIONALITIES.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className="col-md-4 form-group">
              <div className="group-img">
                <select {...formik.getFieldProps("gender")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.gender && formik.errors.gender },
                  )} 
                  disabled
                  >
                  <option value={""}>{LANG.PLEASE_CHOOSE}</option>
                  {GENDERS.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className="col-md-4 form-group">
              <div className="group-img">
                <select
                  {...formik.getFieldProps("bloodGroup")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.bloodGroup && formik.errors.bloodGroup },
                  )}>
                  <option value={""}>{LANG.SELECT} {LANG.BLOOD_GROUP}</option>
                  {BLOOD_GROUP_LIST.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.PHONE}
                  {...formik.getFieldProps("phone")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.phone && formik.errors.phone },
                  )} />
              </Form.Group>
            </div>
          </div>

          <VisibilityBox show={getAge(userDetail?.dob) < 18}>
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
                    <ErrorText show={formik.errors.parentFirstName} message={formik.errors.parentFirstName} />
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

          <label>{LANG.BANK_DETAIL}</label>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text"
                  placeholder={LANG.BANK_NAME}  {...formik.getFieldProps("bankName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.bankName && formik.errors.bankName },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.IBAN_BANK_ACCOUNT} {...formik.getFieldProps("iban")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.iban && formik.errors.iban },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.BIC_BANK_CODE} {...formik.getFieldProps("bic")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.bic && formik.errors.bic },
                  )} />
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.ACCOUNT_HOLDER}
                  readOnly={true}
                  {...formik.getFieldProps("accountHolder")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.accountHolder && formik.errors.accountHolder },
                  )}
                />
              </Form.Group>
            </div>




          </div>

          <label>{LANG.DOCUMENTS}</label>

          <div className='row'>
            <VisibilityBox show={userDetail?.matchPermissionDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">Erstmalige Spielerlaubnis
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.matchPermissionDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.clubTransferDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">Vereinswechsel
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.clubTransferDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.birthCertificateDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.BIRTH_CERTIFICATE}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.birthCertificateDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.residenceCertificateDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.RESIDENCE_CERTIFICATION}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.residenceCertificateDoc)} ><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.playersParentDeclarationDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.PLAYER_PARENTS_DECLARATION}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.playersParentDeclarationDoc)} ><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.copyOfPassportDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.COPY_OF_PASSPORT}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.copyOfPassportDoc)} ><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.attachmentArgentinaDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.APPLICATION_ATTACHMENT_ARGETINA}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.attachmentArgentinaDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.attachmentIstupnicaDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.APPLICATION_ATTACHMENT_ISTUPNICA}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.attachmentIstupnicaDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <VisibilityBox show={userDetail?.attachmentBrisovnicaDoc}>
              <div className='col-md-12 mb-2'>
                <div className="fileUpload form-group mb-2 border rounded" >
                  <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                    <span className="text-black">{LANG.APPLICATION_ATTACHMENT_BRISOVNICA}
                    </span>
                    <span className="iconWrap" onClick={() => download(userDetail?.attachmentBrisovnicaDoc)}><DownloadIcon /></span>
                  </div>
                </div>
              </div>
            </VisibilityBox>
            <div className='col-md-12'>
              <Form.Group className="mb-3">

              </Form.Group>
            </div>
            <div className='col-md-12'>
              <Form.Group className="mb-3">

              </Form.Group>
            </div>
          </div>
          <Button type='submit' className='updateBtn mt-4'>{LANG.UPDATE}</Button>
        </Form>
      </div>
    </div>
  )
}
