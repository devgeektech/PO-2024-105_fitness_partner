import React, { useEffect, useState } from "react";
import "./style.scss";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import FileIcon from "../../../icons/FileIcon";
import AngleWhiteTopIcon from "../../../icons/AngleWhiteTopIcon";
import CrossWhiteBlackIcon from "../../../icons/CrossWhiteBlackIcon";
import { Link } from "react-router-dom";
import CrossIcon from "../../../icons/CrossIcon";
import TimerIcon from "../../../icons/TimerIcon";
import GroupUsersIcon from "../../../icons/GroupUsersIcon";
import { useFormik } from "formik";
import { editPartner } from "../../../services/partner.service";
import { toast } from "react-toastify";
import { addClass } from "../../../services/classes.service";
import { getServicelist } from "../../../services/services.service";

export default function ClassesTab(params:any) {
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const [count, setCount] = useState(0);
  const [afterOccurencesCount, setAfterOccurencesCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [servicelist, setServicelist] = useState<any[]>([]);
  const classInitialValues: any = {
    classStatus: true,
    serviceId: "",
    className: "",
    description: "",
    classStartDate: "",
    classStartTime: "",
    classEndTime: "",
    classRepeatType: "",
    classRepeatCount: 0,
    classSelection: "",
    classWeekdays: [],
    classEndType: "",
    classEndDate: "",
    classEndOccurence: 0,
    maxBooking: 1,
    images: [],
  };

  const classSchema: any = Yup.object().shape({
    classStatus: Yup.string().optional(),
    // serviceId: Yup.string().optional(),
    // className: Yup.string().optional(),
    // description: Yup.string().optional(),
    // classStartDate: Yup.string().optional(),
    // classStartTime: Yup.string().optional(),
    // classEndTime: Yup.string().optional(),
    // classRepeatType: Yup.string().optional(),
    // classSelection: Yup.string().optional(),
    // classWeekdays: Yup.array().optional(),
    // classEndType: Yup.string().optional(),
    // classEndDate: Yup.string().optional(),
    // classEndOccurence: Yup.number().optional(),
    // maxBooking: Yup.number().optional(),
    // images: Yup.array().optional(),
  });

  const services = [
    { id: "1", name: "Service One" },
    { id: "2", name: "Service Two" },
    { id: "3", name: "Service Three" },
    { id: "4", name: "Service Four" },
  ];

  const daysOfWeek = [
    { id: "everyday", name: "Everyday" },
    { id: "monday", name: "Monday" },
    { id: "tuesday", name: "Tuesday" },
    { id: "wednesday", name: "Wednesday" },
    { id: "thursday", name: "Thursday" },
    { id: "friday", name: "Friday" },
    { id: "saturday", name: "Saturday" },
    { id: "sunday", name: "Sunday" },
  ];

  const slotOptions = ["day", "week", "month", "year"];

  useEffect(() => {
    getServices();
  }, []);

  function increment(type = "repeat") {
    if (type == "end") {
      setAfterOccurencesCount(function (prevCount) {
        return (prevCount += 1);
      });
    } else {
      setCount(function (prevCount) {
        return (prevCount += 1);
      });
    }
  }

  function decrement(type = "repeat") {
    if (type == "end") {
        setAfterOccurencesCount(function (prevCount) {
            if (prevCount > 0) {
                return (prevCount -= 1);
            } else {
                return (prevCount = 0);
            }
            });
        }   
    else {
    setCount(function (prevCount) {
        if (prevCount > 0) {
            return (prevCount -= 1);
        } 
        else {
            return (prevCount = 0);
        }
        });
    }   
  }

  const handleDayCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedDays = checked
      ? [...selectedDays, value]
      : selectedDays.filter((day) => day !== value);

    if (value === "everyday" && checked) {
      setSelectedDays(["everyday"]);
    } else if (value === "everyday" && !checked) {
      setSelectedDays([]);
    } else {
      const filteredDays = updatedDays.filter((day) => day !== "everyday");
      setSelectedDays(filteredDays);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const selectedPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...selectedPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleServiceChange = (event: any) => {
    let item:any = servicelist.find(item => item.name==event.target.value)
 
    if(item._id){
      formik.setFieldValue("serviceId", item._id)
    }
  };

  function isLiveUrl(filename:any) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
        if (imageExtensions.includes(extension)) {
            return true;
        } else {
            return false
        }
    }

  const formik = useFormik({
    initialValues: classInitialValues,
    validationSchema: classSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values,">>> values >>>>")

      let classRepeat: any = {
        repeatCount: count,
      }
      let classEnd: any = {
      }
      let classTime: any = {
      }

      if(values.classRepeatType == "repeat"){
        classRepeat.type = "repeat";
      }
      if(values.classRepeatType == "doesNotRepeat"){
        classRepeat.type = "doesNotRepeat";
      }
      if (values.classWeekdays) {
        classRepeat.selection = values.classWeekdays;
        if (
          values.classWeekdays == "week" &&
          selectedDays &&
          selectedDays.length > 0
        ) {
          classRepeat.weekDays = selectedDays;
        }
      }
      
      if(values.classEndType){
        classEnd.type = values.classEndType
        if(values.classEndType == "on"){
            if(values.classEndDate){
            classEnd.date = values.classEndDate
            }
        }
        if(values.classEndType == "after"){
            classEnd.NoOfOccurence = afterOccurencesCount;
        }
      }

      if(values.classStartTime) {
        classTime.start = values.classStartTime
      }
      if(values.classEndTime){
        classTime.end = values.classStartTime
      }
      if(values.classStartDate){
        classTime.date = values.classStartDate
      }
      values.classRepeat = classRepeat;
      values.classEnd = classEnd;
      values.classTime = classTime;
      if(images && images.length > 0) values.images = images;
      const formData = new FormData();
      for (const key in values) {
        if (Array.isArray(values[key])) {
          console.log(values[key],">>> If  >>>")
          values[key].forEach((item:any, index:any) => {
            if (typeof item === 'object' && item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            } else {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } 
        else if (typeof values[key] === 'object' && values[key] instanceof File) {
          console.log(values[key],">>> Else If >>>")
          formData.append(key, values[key]);
        } 
        else {
          if(typeof values[key] === 'object'){
            formData.append(key, JSON.stringify(values[key]));
          }else {
            formData.append(key, values[key]);
          }
        }
      }

      const result = await addClass(formData);
      if (result.data) {
        console.log(result.data);
        toast.success("Classes Added successfully");
      }
      setLoading(true);
      try {
        console.log();
      } catch (error) {
        console.log(error, loading);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const getServices = async () => {
    try {
      const result = await getServicelist();
      setServicelist(result?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="classesTabWrap">
        <div className="bgFormColor p-4 mb-3">
          <label>Class information</label>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="statusCheck d-flex justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Class status</span>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    {...formik.getFieldProps("classStatus")}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <Form.Select
                aria-label="Default select example"
                className="commonInput form-control"
                name="serviceId"
                value={formik.values.serviceId}
                onChange={handleServiceChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select service</option>
                {servicelist.map((service: any) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            {/* {formik.touched.serviceId && formik?.errors.serviceId && (
                <div className="error-message">{formik?.errors.serviceId}</div>
            )} */}
            <div className="col-md-4 mb-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <Form.Control
                    className="commonInput"
                    type="text"
                    placeholder="Class name"
                    {...formik.getFieldProps("className")}
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-sm-12">
              <div className="group-img iconLeft  position-relative textareaWrap">
                <label>
                  <FileIcon />
                </label>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Tell us something about your class"
                    className="addressTextarea"
                    {...formik.getFieldProps("description")}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class start date</label>
          <div className="row">
            <div className="col-md-6">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <Form.Control
                    className="commonInput"
                    type="date"
                    placeholder="Class name"
                    {...formik.getFieldProps("classStartDate")}
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="wrap mt-3">
            <label>Class timings</label>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="group-img iconLeft  position-relative textareaWrap">
                    <Form.Control
                      className="commonInput"
                      type="time"
                      placeholder="Class name"
                      {...formik.getFieldProps("classStartTime")}
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="group-img iconLeft  position-relative textareaWrap">
                    <Form.Control
                      className="commonInput"
                      type="time"
                      placeholder="Class name"
                      {...formik.getFieldProps("classEndTime")}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="wrap mt-3">
            <label>Class repeat</label>
            <div className="row align-items-end">
              <div className="col-xl-4">
                <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <label className="mb-0 d-flex align-items-center">
                      <input
                        type="radio"
                        {...formik.getFieldProps("doesNotRepeat")}
                        checked={
                          formik.values.classRepeatType === "doesNotRepeat"
                        }
                        onChange={(e) => {
                          console.log("e.target.value", e.target.value);
                          formik.setFieldValue(
                            "classRepeatType",
                            "doesNotRepeat"
                          );
                        }}
                      />
                      <span className="radioText">Does not repeat</span>
                      <span className="bgBlue"></span>
                    </label>
                  </div>
                </div>
                <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <label className="mb-0 d-flex align-items-center">
                      <input
                        type="radio"
                        {...formik.getFieldProps("repeat")}
                        checked={
                          formik.values.classRepeatType === "repeat"
                        }
                        onChange={(e) => {
                          formik.setFieldValue(
                            "classRepeatType",
                            "repeat"
                          );
                        }}
                      />
                      <span className="radioText">Repeat every</span>
                      <span className="bgBlue"></span>
                      <div className="addOption">
                        <input value={count} />
                        <div className="btnsWrap">
                          <button type="button" onClick={() => increment("repeat")}>
                            <AngleWhiteTopIcon />
                          </button>
                          <button
                            type="button"
                            className="rotate"
                            onClick={() => decrement("repeat")}
                          >
                            <AngleWhiteTopIcon />
                          </button>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <ul className="daysRadioBox">
                  {slotOptions.map((option) => (
                    <li key={option}>
                      <label>
                        <input
                          type="radio"
                          name="classWeekdays"
                          value={option}
                          onChange={formik.handleChange}
                          checked={formik.values.classWeekdays === option}
                        />
                        <span className="day">{option}</span>
                        <span className="bg"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                {formik?.values?.classWeekdays == "week" && (
                  <ul className="daysCheckbox">
                    {daysOfWeek.map((day) => (
                      <li key={day.id}>
                        <label>
                          <input
                            type="checkbox"
                            value={day.id}
                            checked={selectedDays.includes(day.id)}
                            onChange={handleDayCheckboxChange}
                          />
                          <span className="day">{day.name}</span>
                          <span className="bg"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="wrap mt-3">
            <label>Class ends</label>
            <div className="row">
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "never");
                          }}
                          checked={formik.values.classEndType === "never"}
                        />
                        <span className="radioText">Never</span>
                        <span className="bgBlue"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "on");
                          }}
                          checked={formik.values.classEndType === "on"}
                        />
                        <span className="radioText">On</span>
                        <span className="bgBlue"></span>
                      </label>
                      <div className="dateShow">
                        <Form.Control
                          className="commonInput"
                          type="date"
                          placeholder="Class name"
                          {...formik.getFieldProps("classEndDate")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "after");
                          }}
                          checked={formik.values.classEndType === "after"}
                        />
                        <span className="radioText">After</span>
                        <div className="addOccurenceOption">
                          <input value={afterOccurencesCount + " occurences"} />
                          <div className="btnsWrap">
                            <button type="button" onClick={() => increment("end")}>
                              <AngleWhiteTopIcon />
                            </button>
                            <button
                              type="button"
                              className="rotate"
                              onClick={() => decrement("end")}
                            >
                              <AngleWhiteTopIcon />
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="addedTime my-3">
              <li>
                <button  type="button">
                  <CrossIcon />
                </button>
                <TimerIcon />
                <label>
                  Monday, Tuesday | 05.00 AM - 04:00 PM | end on 4 Feb 2025
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class capacity</label>
          <div className="row">
            <div className="col-md-6">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft rightLeft  position-relative textareaWrap">
                  <label>
                    <GroupUsersIcon />
                  </label>
                  <Form.Control
                    className="commonInput"
                    type="text"
                    {...formik.getFieldProps("maxBooking")}
                  />
                  <span className="person">| person</span>
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class images</label>
          <div className="uploadWrapper">
            <ul className="outerBlock">
            <li>
                  <ul className="showImages">
                  {previews.map((preview, index) => (
                      <li className="position-relative" key={index}>
                        <button
                          type="button"
                          className="crossBtn"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CrossWhiteBlackIcon />
                        </button>
                        <div className="image">
                          <img 
                          src= {
                            isLiveUrl(preview)
                              ? fileUrl + preview
                              : preview
                          } 
                          alt={`Uploaded ${index}`} className="w-100" />
                        </div>
                      </li>
                    ))}
                    <li className="uploadBlock">
                      <div className="upload text-center">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <img
                            src={"/assets/img/uploadIcon.png"}
                            alt="uploadIcon"
                          />
                        <p>Drop or upload images</p>
                        <button  type="button">Browse image</button>
                      </div>
                    </li>
                  </ul>
                </li>
            </ul>
          </div>
        </div>
        <div className="d-flex flex-column align-items-start">
          <button type="submit" className="saveBtn">
            Save class
          </button>
          <Link className="policyLink" to={"#"}>
            Read about our visitors class cancellation policy
          </Link>
        </div>
      </div>
    </Form>
  );
}
