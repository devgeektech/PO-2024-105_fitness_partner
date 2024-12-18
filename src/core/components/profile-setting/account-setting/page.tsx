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
import BusinessIcon from '../../../../icons/BusinessIcon';
import FileIcon from '../../../../icons/FileIcon';
import { Link } from 'react-router-dom';
import LocationIcon from '../../../../icons/LocationIcon';
import CrossIcon from '../../../../icons/CrossIcon';
import TimerIcon from '../../../../icons/TimerIcon';
import SearchIcon from '../../../../icons/SearchIcon';
import CrossWhiteBlackIcon from '../../../../icons/CrossWhiteBlackIcon';

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
  const items = ["Item 1", "Item 2", "Item 3"];

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
      <div className='personalIformation   formEditWrap mb-3'>
        
        <Form onSubmit={formik.handleSubmit}>
          <div className='bgFormColor p-4 mb-3'>
            <label>Business information</label>
            <div className='row'>
              <div className='col-md-4'>
                <Form.Group className="mb-3">
                <div className="group-img iconLeft  position-relative">
                  <label><BusinessIcon/></label>
                  <input type="text" placeholder="Business name"
                    readOnly={true}
                    {...formik.getFieldProps("firstName")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.firstName && formik.errors.firstName },
                    )}
                  />
                  </div>
                </Form.Group>
              </div>

            </div>
          
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <div className="group-img iconLeft  position-relative textareaWrap">
                <label><FileIcon/></label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  defaultValue='' 
                  {...formik.getFieldProps("description")}
                  name="description"
                  placeholder='Tell us something about your business'
                /> 
                </div>
              </Form.Group>
          </div>

          <div className='bgFormColor p-4 mb-3'>
            <label>Address</label>
            <div className="group-img iconLeft  position-relative textareaWrap">
              <label><LocationIcon/></label>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} placeholder='enter street address'
                  {...formik.getFieldProps("street")}
                  className={clsx(
                    "addressTextarea",
                    { "border border-danger": formik.touched.street && formik.errors.street },
                  )} />
              </Form.Group>
            </div>
            <div className='row'>
            <div className='col-md-6'>
                <Form.Group className="mb-3">
                  <input type='text' placeholder={LANG.ZIP_CODE} {...formik.getFieldProps("zipCode")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                    )} />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group className="mb-3">
                  <input type="text"
                    placeholder='City'  {...formik.getFieldProps("houseNumber")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.houseNumber && formik.errors.houseNumber },
                    )} />
                </Form.Group>
              </div>
              
            </div>
          </div>  
          <div className='bgFormColor p-4 mb-3'>
            <label>Working hours</label>
            <ul className='addedTime mb-3'>
              <li><button><CrossIcon/></button><TimerIcon/><label>Monday, Tuesday | 05.00 AM - 04:00 PM</label></li>
            </ul>
            <div className='row'>
              <div className='col-md-6'>
                <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                  <input type='time' placeholder='Open at' {...formik.getFieldProps("zipCode")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                    )}
                     />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                  <input type="time"
                    placeholder='Close at'  {...formik.getFieldProps("houseNumber")}
                    className={clsx(
                      "commonInput form-control",
                      { "border border-danger": formik.touched.houseNumber && formik.errors.houseNumber },
                    )} />
                </Form.Group>
              </div>
              
            </div>
            <ul className='daysCheckbox'>
              <li><label><input type="checkbox" /><span className='day'>Everyday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Monday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Tuesday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Wednesday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Thursday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Friday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Saturday</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Sunday</span> <span className='bg'></span></label></li>
            </ul>
            <button className='updateBtn' type='button'>Add time</button>
          </div>  

          <div className='bgFormColor p-4 mb-3'>
            <label>Services</label>
            <div className='row'>
              <div className='col-md-12'>
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <label><SearchIcon/></label>
                    <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <input type='text' placeholder='Search service' {...formik.getFieldProps("zipCode")}
                        className={clsx(
                          "commonInput form-control",
                          { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                        )}
                        />
                    </Form.Group>
                </div>
              </div>
              
            </div>
            <ul className='daysCheckbox servicesWrap'>
              <li><label><input type="checkbox" /><span className='day'>Boxing</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Climbing</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>CrossFit</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>GRIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>HIIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pickleball</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pilates</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Spinning</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>CrossFit</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>GRIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>HIIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pickleball</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pilates</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Spinning</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>CrossFit</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>GRIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>HIIT</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pickleball</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Pilates</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Spinning</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Dance</span> <span className='bg'></span></label></li>
              <li><label><input type="checkbox" /><span className='day'>Swimming Yoga</span> <span className='bg'></span></label></li>
            </ul>
          </div>  
          <div className='bgFormColor p-4 mb-3'>
            <label>Gym images</label>
            <div className='uploadWrapper'>
                <ul className='outerBlock'>
                  <li>
                  <ul className='showImages'>
                      {items && items.map((item,index) =>{ return <li className='position-relative'>
                        <button className='crossBtn'><CrossWhiteBlackIcon/></button>
                        <div className='image'>
                          <img src={'/assets/img/uploadOne.png'} alt='uploadOne' className='w-100 '/>
                        </div>
                      </li>})}
                      <li className='uploadBlock'>
                        <div className='upload text-center'>
                          <input type='file'/>
                          <img src={"/assets/img/uploadIcon.png"} alt='uploadIcon'/>
                          <p>Drop or upload images</p>
                          <button>Browse image</button>
                        </div>
                      </li>                   
                  </ul>
                  </li>
                </ul>
            </div>
          </div>  
          <div className='updateWrap'>
            <Button type='submit' className='updateBtn mt-4'>Update profile</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
