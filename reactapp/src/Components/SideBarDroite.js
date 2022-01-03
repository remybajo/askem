import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Inscription from "./inscription";
import { connect } from "react-redux";
import {
  Layout,
  Menu,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import {
  EditOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;



function SideBarDroite(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);


  //Base de donnée Data
  const themeData = [
    
      "Politique Exterrieure",
      "Education",
      "Emploi",
      "Environnement",
      "Economie",
      "Politique Intérrieure",
      "Santé",
      "Transport",
      "Culture",
      "Agriculture et Alimentation",
      "Social",
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


  var publiTheme = themeData.map((theme, i) => {
    return (
      <Menu.Item key="i">
        {" "}
        <Link to={`/pageTheme/${theme}`}> {theme} </Link>
      </Menu.Item>
    );
  });

  return (
    <Sider >
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
