import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Inscription from "./inscription";
import { connect } from "react-redux";
import {
  Button,
  Layout,
  Menu,
  Image,
  Card,
  Avatar,
  Divider,
  Row,
  Col,
  Tabs,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

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
