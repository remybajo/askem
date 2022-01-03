import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Card,
  Row,
  Col,
  Tabs,
  List,
  Space,
  BackTop,
  Statistic,
} from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  DownCircleFilled,
  SolutionOutlined,
  EditFilled,
} from "@ant-design/icons";
import SideBarDroite from "./Components/SideBarDroite";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Header from "./Components/Header";

const { Content, Footer } = Layout;

const { TabPane } = Tabs;

//questions aléatoires
const listData = [];
for (let i = 0; i < 3; i++) {
  listData.push({
    href: "https://ant.design",
    title: `THEME ${i + 1}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "sous-theme ou tag perso",
    content: "",
    key: { i },
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Accueil(props) {
  const [latest, setLatest] = useState([]);
  const [allPublications, setAllPublications] = useState([]);
  const [populaires, setPopulaires] = useState([]);
  const [votes, setVotes] = useState([]);

  //Récupération des 3 publications du carroussel à l'initialisation
  useEffect(() => {
    const findPublications = async () => {
      // Recup articles les plus récents
      const publications = await fetch("publications/lastPublications");
      const body = await publications.json();
      // console.log("3 articles", body.latest);
      setLatest(body.latest);
      //console.log(body);
    };
    findPublications();

    //recup articles des trois articles les plus populaire plus populaires
    const popPublications = async () => {
      const plusPopulaires = await fetch("publications/populaires");
      const res_populaires = await plusPopulaires.json();
      console.log("populaires: ", res_populaires.topPublications);
      setPopulaires(res_populaires.topPublications);
    };
    popPublications();

    // recup de toutes les publications
    const allPublications = async () => {
      const listPublications = await fetch("publications/allPublications");
      const response = await listPublications.json();
      console.log("all: ", response.allPublications);
      setAllPublications(response.allPublications);
    };
    allPublications();
  }, []);

  var publiCards = latest.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item key={i}>
        <img
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50px",
            height: "400px",
          }}
          className="d-block w-100"
          src={publication.image}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              backgroundColor: "#edc5c4",
              alignItems: "center",
            }}
          >
            {publication.titre}
          </h3>

          <Link
            class="btn btn-danger"
            role="button"
            to={`/publication/${toRead._id}`}
          >
            VOIR
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  var topPublications = populaires.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item>
        <img
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50px",
            height: "400px",
          }}
          className="d-block w-100"
          src={publication.image}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              backgroundColor: "#edc5c4",
              alignItems: "center",
            }}
          >
            {publication.titre}
          </h3>

          <Link
            class="btn btn-danger"
            role="button"
            to={`/publication/${toRead._id}`}
          >
            VOIR
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  ///Récupération nombre de vote
  useEffect(() => {
    const findVotes = async () => {
      // Recup articles les plus récents
      const votes = await fetch("/allVotes");
      const body = await votes.json();

      // console.log("3 articles", body.latest);
      setVotes(body.allVotes);
      console.log(body);
    };
    findVotes();
  }, []);

  return (
    /* header */
    <Layout className="layout" style={{ margin: 10, backgroundColor: "white" }}>
      <Header />

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
        >
          <Row justify="center">
            <Tabs type="card" style={{ width: 900, height: 600, padding: 15 }}>
           

              <TabPane tab="Les plus populaires" key="2">
                <Carousel>{topPublications}</Carousel>
              </TabPane>
            </Tabs>
          </Row>
          <Row>
            <Col
              justify="start"
              span={12}
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              <h3> Les objectifs du programme populaire </h3>
              <p>
                La proposition du programme populaire c'est :<br />- De pouvoir proposer un programme choisit par les citoyens.  <br />
                - De sortir d'une logique de candidat pour rentrer dans une logique de programme. <br />
                - De prôner un programme qui transcende les partis
             
            
              
                <br /> Nous nous engageons à publier les resultats en temps rééls et en tout transparence.
              </p>
              <div id="ical">
                <DownCircleFilled
                  style={{
                    fontSize: "60px",
                    color: "#214C74",

                    marginTop: "50px",
                  }}
                />
              </div>
            </Col>
            <Col id="illustration2" span={12}></Col>
          </Row>
          <Row justify="center">
            <Col span="2"></Col>
            <Col span="20">
              <h1
                style={{
                  backgroundColor: "#214C74",
                  marginTop: "50px",
                  marginBottom: "50px",
                  color: "white",
                  width: "100%",
                  textAlign: "center",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: "30px",
                }}
              >
                Propositions aléatoires
              </h1>
            </Col>
            <Col span="2"></Col>
          </Row>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={allPublications}
            footer={<div></div>}
            renderItem={(publication) => (
              <List.Item
                key={publication.titre}
                actions={[
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width="272"
                    height="150"
                    alt="logo"
                    src={publication.image}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <Link to={`/publication/${publication._id}`}>
                      {publication.titre}
                    </Link>
                  }
                  description={publication.texte}
                />
                {/* "{item.content}" */}
              </List.Item>
            )}
          />
          <Row
            style={{
              backgroundColor: "#C9F6F5",

              borderRadius: "20px",
              marginTop: "60px",
              marginBottom: "60px",
            }}
          >
            
           
          </Row>
          <div
            className="site-statistic-demo-card"
            style={{ marginBottom: "30px" }}
          >
            <h3
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: "30px",
                marginLeft: "400px",
              }}
            >
              {" "}
              Ils ont donné voté...
            </h3>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de publication"
                    value={allPublications.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<EditFilled />}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de votes"
                    value={votes.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
     
      <>
        <BackTop />
      </>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    goToPublication: function (toRead) {
      dispatch({ type: "readPublication", selectPublication: toRead });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
