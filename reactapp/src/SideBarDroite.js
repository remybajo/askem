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
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;
const { TabPane } = Tabs;

function SideBarDroite(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [isConnectProfil, setIsConnectProfil] = useState(false);
  // const [theme, setTheme] = useState("")

  //Base de donnée Data
  const themeData = [
    "Emploi",
    "Education",
    "Politique",
    "Evenement",
    "Environnement",
    "Sport",
    "Tourisme",
    "Tu as remarqué ?",
    "Nutrition",
    "Santé",
    "Technologie",
    "Transport"
  ];


  var showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  // var handleClickPubli = (e) => {
  //   if (props.token == null) {
  //     showModal();
  //   } else {
  //     setIsConnectProfil(true);
  //   }
  // };

 

  // if (isConnectProfil) {
  //   return <Redirect to="/nouvelPublication" />;
  // }

  var publiTheme = themeData.map((theme, i) => {
    return (
      <Menu.Item key="i">
        {" "}
        <Link to={`/pageTheme/${theme}`}> {theme} </Link>
      </Menu.Item>
    );
  });

  return (
    <Sider className="site-layout-background">
      <Modal
        style={{ displayflex: 1, width: 150 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Inscription />{" "}
      </Modal>{" "}
      <Menu
        style={{ width: 200 }}
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Thématique">
          {publiTheme}
        </SubMenu>
        {props.token ?
        <Menu.Item
          //onClick={() => handleClick()}
          key="2"
          icon={<CalendarOutlined />}
        > <Link to="/pageprofil">Mon compte</Link>
        </Menu.Item>
        :
        <Menu.Item
          onClick={() => showModal()}
          key="2"
          icon={<CalendarOutlined />}
        > Mon compte
        </Menu.Item>
          }
        
        {props.token ?
        <Menu.Item
          //onClick={() => handleClickPubli()}
          key="link"
          icon={<EditOutlined />}
        > <Link to="/nouvelPublication">Nouvelle publication</Link>
        </Menu.Item>
        :
        <Menu.Item
          onClick={() => showModal()}
          key="2"
          icon={<CalendarOutlined />}
        > Nouvelle Publication
        </Menu.Item>
        }
        
      </Menu>
    </Sider>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(SideBarDroite);
