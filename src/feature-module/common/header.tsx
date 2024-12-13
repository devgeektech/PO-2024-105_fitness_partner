import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, isLoginUser } from "../../services/user.service";
import { setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";
import { Dropdown } from "react-bootstrap";
import { clearStorage } from "../../services/storage.service";
import { LANG } from "../../constants/language";
import VisibilityBox from "../../core/components/VisibilityBox";
import { OverlayPanel } from "primereact/overlaypanel";
import Notification from "../../core/components/notification/Notification";
import { getAllNotifications } from "../../services/notifications.service";
import { setNotifications, setUnReadNotificationCount, setReadNotificationCount } from "../../core/data/redux/notification/notificationSlice";
import { socket } from "../../utils/socket-client";
import SubscriptionIcon from "../../icons/SubscriptionIcon";
import AccountSettingIcon from "../../icons/AccountSettingIcon";
import HelpSupportIcon from "../../icons/HelpSupportIcon";
import LogutIcon from "../../icons/LogutIcon";
import { Badge } from "primereact/badge";
// import profileImage from "../../../public/assets/img/memberImg.png";

const Header = () => {
  const routes: any = all_routes;
  const npanel: any = useRef(null);
  const headerRef = useRef(null);
  const user = useSelector((state: any) => state.user);
  const role = localStorage.getItem('role');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedNotifications = useSelector((state: any) => state.notification?.notifications) || [];
  const notReadNotifications = useSelector((state: any) => state.notification.notificationCount);
  useEffect(() => {
    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
      // Ensure the socket connects only once
    }
    if (socket) {
      // Listen for incoming notifications
      socket.on("receiveNotification", (data) => {
        const notificationRecords: any = [data,...savedNotifications]
        dispatch(setNotifications(notificationRecords));
        dispatch(setUnReadNotificationCount(1));
      });

      // Listen for other messages if needed
      socket.on("message", (data) => {
        console.log("Message:", data);
      });
      // Clean up the socket listeners when the component unmounts
      return () => {
        socket.off("receiveNotification"); // Remove specific listener
        socket.off("message");
        socket.off("joinRoom"); // Remove specific listener
        if (socket.connected) {
          socket.disconnect(); // Disconnect the socket when the component unmounts
        }
      };
    }
  }, [savedNotifications, socket, dispatch, notReadNotifications, setReadNotificationCount]);
  const fileUrl = process.env.REACT_APP_FILE_URL;

  const capitalizeFirstLetter = (text: any) => {
    if (!text) return ''; // Handle undefined or empty text
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const goToManageSubscription = () => {
    let str = ''
    if(role == 'trainer') str = '/trainer/trainer-dashboard?tab=profile&tabKey=subscription';
    if(role == 'sponsor') str = '/sponsor/sponsor-dashboard?tab=profile&tabKey=subscription';
    if(role == 'member')  str = '/user/user-dashboard?tab=profile&tabKey=subscription';
    if(str!= '')  navigate(str);
    setTimeout(()=>{
      document.getElementById('tabs-layout')?.scrollIntoView({behavior:'smooth',block:'start'})
    },400)
  }

  const goToAccountSetting = () => {
    let str = ''
    if(role == 'trainer') str = '/trainer/trainer-dashboard?tab=profile&tabKey=accountSetting';
    if(role == 'sponsor') str = '/sponsor/sponsor-dashboard?tab=profile&tabKey=accountSetting';
    if(role == 'member')  str = '/user/user-dashboard?tab=profile&tabKey=accountSetting';
    if(str!= '')  navigate(str);
    setTimeout(()=>{
      document.getElementById('tabs-layout')?.scrollIntoView({behavior:'smooth',block:'start'})
    },400)
  }


  const gotToSupport = () => {
    let str = ''
    if(role == 'trainer') str = '/trainer/trainer-dashboard?tab=profile&tabKey=support';
    if(role == 'sponsor') str = '/sponsor/sponsor-dashboard?tab=profile&tabKey=support';
    if(role == 'member')  str = '/user/user-dashboard?tab=profile&tabKey=support';
    if(str!= '')  navigate(str);
    setTimeout(()=>{
      document.getElementById('tabs-layout')?.scrollIntoView({behavior:'smooth',block:'start'})
    },400)
  }

  useEffect(() => {
    const isLogged = isLoginUser();
    if (isLogged) {
      dispatch(setLogin(true));
      getUserDetail();
    } else {
      navigate(routes.login);
    }
  }, [])

  const getUserDetail = async () => {
    const [result] = await Promise.all([getUserById()]);
    dispatch(setUserDetail(result?.data?.data));
    try {
      const notificationData = await getAllNotifications({ page: 1, limit: 20 })
      if (notificationData.status == 200) {
        dispatch(setNotifications(notificationData?.data?.data));
      }
    } catch (error) {
      console.log(error)
    }

  }

  const logout = async () => {
    dispatch(setLogin(false));
    clearStorage();
    navigate(routes.login)
  }

  const header = [
    {
      tittle: LANG.CONTACT_US,
      showAsTab: false,
      separateRoute: true,
      routes: routes.contactUs,
      hasSubRoute: false,
      showSubRoute: false,
    },
  ];

  const customStyle = {
    background: location.pathname.includes(routes.home)
      ? "rgb(23, 124, 130)"
      : "#ffffff",
  };

  const notificationDetail = (e: any) => {
    npanel.current?.toggle(e)
    dispatch(setReadNotificationCount(0));

  }

  return (
    <>
      <header
        ref={headerRef}
        className={
          location.pathname.includes(routes.home)
            ? "header header-trans"
            : "header header-sticky"
        }
        style={customStyle}
      >
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link to="index" className="navbar-brand logo">
                {location.pathname.includes(routes.home) ? (
                  <ImageWithBasePath
                    src="assets/img/logo.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                ) : (
                  <ImageWithBasePath
                    src="assets/img/logo.png"
                    className="img-fluid"
                    alt="Another Image"
                  />
                )}
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="index" className="menu-logo">
                  <ImageWithBasePath
                    src="assets/img/logo-black.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="#">
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <VisibilityBox show={user?.isLogin}>
                  <li
                    key={99}
                    className={
                      location.pathname.includes(role == "member" ? routes.userDashboard : routes.trainerDashboard)
                        ? "active"
                        : ""
                    }
                  >
                    <Link to={role == "member" ? routes.userDashboard : routes.trainerDashboard}>{LANG.DASHBAORD}</Link>
                  </li>
                </VisibilityBox>
                <VisibilityBox show={user?.isLogin && role == 'member'}>
                  <li
                    key={99}
                    className={ 
                      location.pathname.includes('/user/forum-list')
                        ? "active"
                        : ""
                    }
                  >
                    <Link to={'/user/forum-list'}>{LANG.FORUM}</Link>
                  </li>
                </VisibilityBox>
                {header.map((mainMenus: any, mainIndex) => (
                  <React.Fragment key={mainIndex}>
                    {mainMenus.separateRoute ? (
                      <li
                        key={mainIndex}
                        className={
                          location.pathname.includes(mainMenus.routes)
                            ? "active"
                            : ""
                        }
                      >
                        <Link to={mainMenus.routes}>{mainMenus.tittle}</Link>
                      </li>
                    ) : (
                      <li
                        className={`has-submenu ${mainMenus?.menu?.map((item: any) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                      >
                        <Link to="#">
                          {mainMenus.tittle}
                        </Link>
                        <ul
                          className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
                        >
                          {mainMenus.menu?.map((menu: any, menuIndex: number) => (
                            <li
                              key={menuIndex}
                              className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item: any) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                            >
                              {menu.hasSubRoute ? (
                                <React.Fragment>
                                  <Link to="#">{menu.menuValue}</Link>
                                  <ul
                                    className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
                                  >
                                    {menu.subMenus?.map(
                                      (subMenu: any, subMenuIndex: any) => (
                                        <li key={subMenuIndex}>
                                          <Link to={subMenu.routes}>
                                            {subMenu.menuValue}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </React.Fragment>
                              ) : (
                                <li
                                  className={
                                    location.pathname.includes(menu.routes)
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <Link to={menu.routes}>{menu.menuValue}</Link>
                                </li>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <i className="pi pi-bell p-overlay-badge cursor-pointer" onClick={notificationDetail} style={{ fontSize: '1.7rem' }}>
                  {notReadNotifications>0 &&<Badge style={{background: 'red'}} value={notReadNotifications}></Badge>}
                </i>
              </li>
              <li className="nav-item">
                {
                  user?.isLogin ? <>
                    <Dropdown className="loginProfileWrapper">
                      <Dropdown.Toggle className="header-profile-button" id="dropdown-basic">
                        {user?.userDetail?.firstName} {user?.userDetail?.lastName}
                        <svg className="ms-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.718L17.0513 10.6667L16.1 9.74867L12 13.8487L7.9 9.74867L6.94867 10.6667L12 15.718ZM12.0043 24C10.345 24 8.78489 23.6851 7.324 23.0553C5.86333 22.4256 4.59267 21.5709 3.512 20.4913C2.43133 19.4118 1.57589 18.1422 0.945667 16.6827C0.315222 15.2233 0 13.6639 0 12.0043C0 10.345 0.314889 8.78489 0.944667 7.324C1.57444 5.86333 2.42911 4.59267 3.50867 3.512C4.58822 2.43133 5.85778 1.57589 7.31733 0.945667C8.77667 0.315222 10.3361 0 11.9957 0C13.655 0 15.2151 0.31489 16.676 0.944668C18.1367 1.57445 19.4073 2.42911 20.488 3.50867C21.5687 4.58822 22.4241 5.85778 23.0543 7.31733C23.6848 8.77667 24 10.3361 24 11.9957C24 13.655 23.6851 15.2151 23.0553 16.676C22.4256 18.1367 21.5709 19.4073 20.4913 20.488C19.4118 21.5687 18.1422 22.4241 16.6827 23.0543C15.2233 23.6848 13.6639 24 12.0043 24ZM12 22.6667C14.9778 22.6667 17.5 21.6333 19.5667 19.5667C21.6333 17.5 22.6667 14.9778 22.6667 12C22.6667 9.02222 21.6333 6.5 19.5667 4.43333C17.5 2.36667 14.9778 1.33333 12 1.33333C9.02222 1.33333 6.5 2.36667 4.43333 4.43333C2.36667 6.5 1.33333 9.02222 1.33333 12C1.33333 14.9778 2.36667 17.5 4.43333 19.5667C6.5 21.6333 9.02222 22.6667 12 22.6667Z" fill="#3C3C3C" />
                        </svg>

                      </Dropdown.Toggle>
                      <div className="dropdownWrap">
                        <Dropdown.Menu>
                          <div>
                          <div className="profileMember d-flex align-items-center gap-2">
                            <div className="profileImg">
                              <img src={user?.userDetail?.avatar ? fileUrl + user?.userDetail?.avatar : "/assets/img/default-avatar.png"} alt="memberImg" />
                            </div>
                            <div className="">
                              <div className="d-flex gap-2 align-items-center">
                                <h3 className="mb-0">{user?.userDetail?.firstName} {user?.userDetail.lastName} </h3> <span className="badge">{capitalizeFirstLetter(role)}</span>
                              </div>
                              <Link className="mail" to={user?.userDetail?.email}>{user?.userDetail?.email}</Link>
                            </div>
                          </div>
                          <div className="linksWrap">
                            {role != "trainer" && (<Dropdown.Item onClick={goToManageSubscription}><SubscriptionIcon /> Manage Subscription</Dropdown.Item>)}
                            <Dropdown.Item onClick={goToAccountSetting}><AccountSettingIcon /> Account Setting</Dropdown.Item>
                            <Dropdown.Item onClick={gotToSupport}><HelpSupportIcon /> Help & Support</Dropdown.Item>
                          </div>
                          <div className="logoutBtnWrap">
                            <Dropdown.Item onClick={logout}><LogutIcon /> {LANG.LOGOUT}</Dropdown.Item>
                          </div>
                        </div>
                        </Dropdown.Menu>
                      </div>
                    </Dropdown>

                  </> :
                    <>
                      <div className="nav-link btn btn-white log-register">
                        <Link to="/auth/login">
                          <span>
                            <i className="feather-users" />
                          </span>
                          Login
                        </Link>{" "}
                        / <Link to="/auth/register">Register</Link>
                      </div>
                    </>
                }

              </li>
              {/* <li className="nav-item">
              <Link className="nav-link btn btn-secondary" to="add-court">
                <span>
                  <i className="feather-check-circle" />
                </span>
                List Your Court
              </Link>
            </li> */}
            </ul>
          </nav>
        </div>
      </header>
      <OverlayPanel className="notification-overlay" ref={npanel} appendTo={headerRef.current}>
        <Notification />
      </OverlayPanel>
    </>
  );
};

export default Header;
