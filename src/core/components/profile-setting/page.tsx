import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import AccountSetting from "./account-setting/page";
import "./style.scss";
import ChangePasswordTabContent from "./change-password/page";
import { INTERFACE_TAB_MENU, TAB_MENU } from "../../../constants";
import SvgIcon from "../../../icons/svgIcons";
import SubscriptionSetting from "./subscription-setting/page";
import HelpAndSupportSetting from "./help-and-support/page";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../services/user.service";
import { LANG } from "../../../constants/language";
import SponsorAccountSetting from "./account-setting/sponsor-account";
import queryString from "query-string";

export default function ProfileTabContent({userDetail}:any) {
  const user = useSelector((state:any)=>state.user);
  const navigate= useNavigate();
  const role = localStorage.getItem('role');
  const location = useLocation();
  const [activeKey, setActiveKey]= useState<any>('accountSetting');
  const { tabKey = "accountSetting",tab }:any = queryString.parse(location.search);

  useEffect(()=> {
    setActiveKey(tabKey); 
  }, [activeKey, tabKey])

  useEffect(()=>{
    if(!getUserToken()){
      navigate("/auth/login");
    }
  },[]);

  const navigateToTab=(tabKey: string)=> {
    setActiveKey(tab)
    let str =''
    if(role == 'trainer') str = `/trainer/trainer-dashboard?tab=${tab}&tabKey=${tabKey}`;
    if(role == 'sponsor') str = `/sponsor/sponsor-dashboard?tab=${tab}&tabKey=${tabKey}`;
    if(role == 'member')  str = `/user/user-dashboard?=${tab}&tabKey=${tabKey}`;
    if(str!= '')  navigate(str);
    
  }

  return (
    <div className="commonGrid" id="profileSection">
      <h4 className="mb-32px">{LANG.PROFILE}</h4>
      <Tab.Container id="left-tabs-example" activeKey={activeKey} defaultActiveKey={activeKey}>
        <Row>
          <Col md={4} lg={3} className="">
            <Nav
              variant="pills"
              className="flex-column proifleSubTab border-right h-100"
            >
              {TAB_MENU.filter(
                (item) =>
                  !((role == "trainer" || role == "sponsor") && item.eventKey == "subscription")
              ).map((item: INTERFACE_TAB_MENU) => (
                <Nav.Item key={item.id}>
                  <Nav.Link onClick={()=>navigateToTab(item.eventKey)} eventKey={item.eventKey}>
                    <SvgIcon type={item.icon} />
                    {item.name}
                  </Nav.Link>{" "}
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md={8} lg={9}>
            <Tab.Content className="proifleSubTabContent">
              <Tab.Pane eventKey="accountSetting">
                {
                  role=='sponsor' ? <SponsorAccountSetting userDetail={userDetail} />: <AccountSetting userDetail={userDetail} />
                }
              </Tab.Pane>
              <Tab.Pane eventKey="changePassword">
                <ChangePasswordTabContent />
              </Tab.Pane>
              {role != "trainer" && (
                <Tab.Pane eventKey="subscription">
                  <SubscriptionSetting userDetail={userDetail} />
                </Tab.Pane>
              )}
              <Tab.Pane eventKey="support" >
                <HelpAndSupportSetting />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
