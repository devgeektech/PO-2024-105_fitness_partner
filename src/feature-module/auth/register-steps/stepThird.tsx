import React, { useEffect, useState } from "react";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import KeyIcon from "../../../icons/KeyIcon";
import GymIcon from "../../../icons/GymIcon";
import StudioIcon from "../../../icons/StudioIcon";
import SquareUser from "../../../icons/SquareUser";
import SquareWellness from "../../../icons/SquareWellness";
import { getWellnesslist } from "../../../services/wellness.service";

const StepThird = ({ formik }: any) => {
  const routes = all_routes;
  const [wellnesslist, setWellnesslist] = useState<any[]>([]);

  useEffect(() => {
    getWellness();
  }, []);

  const getWellness = async () => {
    try {
      const result = await getWellnesslist();
      setWellnesslist(result?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="main-wrapper authendication-pages">
      <div className="content">
        <div className="container wrapper no-padding">
          <div className="row no-margin vph-100">
            <div className="col-12 col-sm-12  col-lg-4 no-padding">
              <div className="dull-pg">
                <div className="row no-margin vph-100 d-flex align-items-top justify-content-center">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <header className="text-center position-relative">
                      <Link className="backBtn" to={"/auth/login"}>
                        <BackIcon />
                      </Link>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="processWrapper">
                      <ul>
                        <li className="active"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="shadow-card steps">
                      <h2 className="text-center">What is your type of business</h2>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form className="selectOptions" autoComplete="off" onSubmit={formik.handleSubmit}>

                            <div className="form-group">
                              {wellnesslist?.map((item: any, index: number) => (
                                <div className="card" key={index}>
                                  <input
                                    type="radio"
                                    name="wellnessTypeId"
                                    value={item._id}
                                    checked={formik.values.wellnessTypeId === item._id}
                                    onChange={() => formik.setFieldValue("wellnessTypeId", item._id)}
                                  />
                                  <h3>
                                    {item.image ? (
                                      <img src={item.image} alt={item.name} className="item-img" />
                                    ) : (
                                      <GymIcon />
                                    )}
                                    {item.name}
                                  </h3>
                                  <p>{item.description}</p>
                                  <span className="bgColor"></span>
                                </div>
                              ))}
                            </div>

                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                            >
                              Continue
                            </button>
                          </form>
                          {/* /Login Form */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-lg-8 no-padding">
              <div className="banner-bg login">
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
    </div>
  );
};

export default StepThird;
