
import React, { useState, useEffect, useRef } from "react";

import {
  Layout,
  Row,
  Col,
} from "antd";
import "antd/dist/antd.css";


const {  Footer } = Layout;

function piedDePage(props) {
  return (
    <Footer className="footer" style={{ textAlign: "left" }}>
      {" "}
      <Row>
        <Col span={8}>
          NOTRE GROUPE
          <ul class="un">
            <li>A propos</li>
            <li>Notre vision</li>
            <li>Contact</li>
          </ul>
        </Col>
        <Col span={8}>
          {" "}
          ASSISTANCE
          <ul class="un">
            <li>Aide</li>
            <li>Guide</li>
            <li>Mentions legales</li>
            <li>CGU</li>
            <li>Cookies</li>
          </ul>
        </Col>
        <Col span={8}>
          {" "}
          RESEAUX SOCIAUX
          <ul class="un">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
}
export default piedDePage;
