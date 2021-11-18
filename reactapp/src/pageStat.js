import {
    Button,
    Layout,
    Menu,
    Breadcrumb,
    Image,
    Card,
    Avatar,
    Divider,
    Row,
    Col,
    Tabs,
    List,
    Space,
    Tag,
    BackTop,
    Badge,
    Modal,
    Carousel,
    Statistic,
    Skeleton,
    message,
  } from "antd";
  import { Link, Redirect } from "react-router-dom";
  import "antd/dist/antd.css";
  import { connect } from "react-redux";
  import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, EditFilled } from "@ant-design/icons";
  import InfiniteScroll from "react-infinite-scroll-component";
  
  import EnTete from "./EnTete";
  import SideBarDroite from "./SideBarDroite";
  import React, { useState, useEffect } from "react";
  import { set } from "mongoose";
  
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { TabPane } = Tabs;
  
  
  function pageStat(props) {

    return (
        // <Layout className="site-layout-background">
      <div id="head">
        <div>
          <Image
            preview={false}
            size={40}
            className="logo"
            width={200}
            src="./image/AGORA.png"
          />
        </div>
        <div>
          {" "}
          <p style={{ marginLeft: "50px" }}>
            {" "}
            Donnez votre avis d'une manière différente{" "}
          </p>
          <Button
            type="primary"
            size={100}
            style={{
              backgroundColor: "rgba(240, 52, 52, 1)",
              borderColor: "rgba(240, 52, 52, 1)",
              marginLeft: "50px",
              boxShadow: "1px 15px 10px grey",
            }}
          >
            Poster votre publication
          </Button>
        </div>

         <div style={{ marginTop: "40px", marginLeft: "40px" }}>
          {" "}
          <Button
            type="text"
            style={{
              backgroundColor: "transparent",
              color: "#214C74",

              borderColor: "transparent",
            }}
          >
            LOG IN
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            style={{
              backgroundColor: "#214C74",

              borderColor: "#214C74",
            }}
          >
            LOG OUT
          </Button>
        </div>
      

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
        >
          
          <Row justify="center">
              </Row>
              
        
              </Content>
          </Layout> 
          </div> 
    )
  }

  function mapStateToProps(state) {
    return { token: state.token };
  }
  
  export default connect(mapStateToProps, null)(pageStat);