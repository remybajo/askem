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
import Inscription from "./inscription";
import SearchBar from "./Components/SearchBar";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
import PiedDePage from "./piedDePage";
import AGORA from "../src/image/AGORA.png"
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { set } from "mongoose";

const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;


function PageProfil(props) {
  const [loading, setLoading] = useState(false);
  const [dataL, setDataL] = useState([]);
  const [latest, setLatest] = useState([]);
  const [voteArticle, setVoteArticle] = useState([]);
  const [myPubli, setMyPubli] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
   

  const [modal, setModal] = useState(false);

  var showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  var handleClick = async () => {
    if (props.token == null) {
      showModal();
    } else {
      setIsModalVisible(!isModalVisible);
    }
  };

  var connexion = "connexion/inscription";


  useEffect(() => {
    const ProfilComment = async () => {
      var rawResponse = await fetch(`/commentarticle?token=${props.token}`);
      const response = await rawResponse.json();
      const publication = response.publication;
      setLatest(publication);

      const votePublication = response.publicationVote;
      setVoteArticle(votePublication);

      const myPublication = response.myArticles;

      setMyPubli(myPublication);
    };
    ProfilComment();
    // cherche()
  }, []);

  // useEffect(() => {
  //   const ProfilVote = async () => {
  //     var rawResponse = await fetch(`/commentarticle?token=${props.token}`);
  //     const vote = await rawResponse.json();
  //     const votePublication = vote.publicationVote;
  //     setVoteArticle(votePublication);
  //     console.log(votePublication);
  //   };
  //   ProfilVote();
  //   // cherche()
  // }, []);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setDataL([...dataL, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  var toRead = latest;

  return (
    <Layout className="site-layout-background">
      
      <Header/>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
        >
          <Col span="16">
            <h1
              style={{
                backgroundColor: "#214C74",
                color: "white",
                width: "100%",
                textAlign: "center",
                height: 50,
                justifyContent: "center",
                marginBottom: 50,
                marginLeft: 200,
              }}
            >
              Mon profil
            </h1>
            <div>
              {" "}
              <Link to="/profilcomp">
                <Button
                  type="danger"
                  style={{ marginLeft: "500px", marginBottom: "30px" }}
                >
                  {" "}
                  Compléter Mon profil
                </Button>
              </Link>
            </div>
          </Col>{" "}
          <div
            className="card-container"
            style={{ marginBottom: "30px", height: 600 }}
          >
            <Tabs
              type="card"
              style={{
                height: 500,
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <TabPane tab="Les publications ou j'ai voté" key="1">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 500,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <InfiniteScroll
                    dataLength={dataL.length}
                    next={loadMoreData}
                    // hasMore={dataL.length < 50}
                    endMessage={
                      <Divider plain>
                        Tu n'as pas voté sur d'autres publication 🤐
                      </Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={voteArticle}
                      renderItem={(item) => (
                        <List.Item key={item._id}>
                          <List.Item.Meta
                            title={
                              <Link to={`/publication/${item._id}`}>
                                {item.titre}
                              </Link>
                            }
                            description={item.texte}
                          />

                          <div></div>

                          <img width={172} alt="logo" src={item.image} />
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </TabPane>
              <TabPane tab="Les publications ou j'ai commenté" key="2">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <InfiniteScroll
                    dataLength={dataL.length}
                    next={loadMoreData}
                    //hasMore={dataL.length < 50}

                    endMessage={
                      <Divider plain>
                        Tu n'as pas commenté d'autres publication 🤐
                      </Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={latest}
                      renderItem={(item) => (
                        <List.Item key={item._id}>
                          <List.Item.Meta
                            title={
                              <Link to={`/publication/${item._id}`}>
                                {item.titre}
                              </Link>
                            }
                            description={item.texte}
                          />

                          <div></div>

                          <img width={172} alt="logo" src={item.image} />
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </TabPane>
              <TabPane tab="Mes publications" key="3">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <InfiniteScroll
                    dataLength={dataL.length}
                    next={loadMoreData}
                    // hasMore={dataL.length < 50}

                    endMessage={
                      <Divider plain>
                        Tu n'as pas créé d'autres publication 🤐
                      </Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={myPubli}
                      renderItem={(item) => (
                        <List.Item key={item._id}>
                          <List.Item.Meta
                            title={
                              <Link to={`/publication/${item._id}`}>
                                {item.titre}
                              </Link>
                            }
                            description={item.texte}
                          />
                          <div></div>
                          <img width={172} alt="logo" src={item.image} />
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div
            className="site-statistic-demo-card"
            style={{ marginBottom: "30px" }}
          >
             <h4 style={{
              display:"flex",
                color: "blue",
                textAlign: "center",
               justifyContent:"center",
                marginBottom: "30px",
               
              }}><Button> <Link to="/pageStat"> Plus de stats </Link> </Button> </h4>
            <h3
              style={{
                color: "white",
                textAlign: "center",
                alignItems : "center",
                marginBottom: "30px",
                marginLeft: "400px",
              }}
            >
              {" "}
              Mes stats 
            </h3>
           
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de publication"
                    value={myPubli.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<EditFilled />}
                    
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de votes"
                    value={voteArticle.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <PiedDePage />
    </Layout>
  );
}
function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(PageProfil);
