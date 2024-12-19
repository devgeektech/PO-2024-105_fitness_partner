import React from "react";
import { Link } from "react-router-dom";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ClassesTab from "../../../core/components/classesTab/page";
import GymSportsIcon from "../../../icons/GymSportsIcon";

export default function CreateClass() {
  return (
    <div className="createClass">
      <div className="container">
        <ul className="breadcrumbWrapper">
          <li>
            <Link to={"#"}>Setting</Link>
          </li> /
          <li>
            <span>Edit setting</span>
          </li>
        </ul>
        <h3>Create class</h3>
        <div className="tabs_Wrap">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col md={4} lg={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first"><GymSportsIcon/>Class settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={8} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <ClassesTab/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}
