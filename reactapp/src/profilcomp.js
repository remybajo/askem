
import './App.css';

import { connect } from 'react-redux'
import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Image,
  Cascader,
  Select,
  Card,
  Form,
  Avatar,
  Divider,
  Row,
  Col,
  InputNumber,
  Tabs,
  List,
  Space,
  Tag,
  BackTop,
  Badge,
  Modal,
  Statistic,
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
  DownCircleFilled,
  SolutionOutlined,
  ArrowUpOutlined,
  EditFilled,
} from "@ant-design/icons";
import SideBarDroite from "./SideBarDroite";
import EnTete from "./EnTete";


const { Header, Content, Footer, Sider } = Layout;



const { Option } = Select;
//import { CookiesProvider } from "react-cookie";
//import Cookies from 'js-cookie';



function Profilcomp(props) {


    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [csp, setCsp] = useState('')
    const [civilState, setCivilState] = useState('')
    const [numberOfcChild, setNumberOfcChild] = useState('')
    const [validation, setValidation] = useState('')
    const [userMail, setUserMail] = useState('')
    //Cookies.set('token', props.token)

  



      

    var handleSubmitComp = async () => {

        const data = await fetch('/addProfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `genderFromFront=${gender}&dateOfBirth=${dateOfBirth}&csp=${csp}&civilState=${civilState}
            &child=${numberOfcChild}&token=${props.token}`

        })

        const body = await data.json()
        if (body.result == true) {
            setValidation(true)
        }
        console.log(body)
    }
 
    const ProfilComplete = async () => {
        var rawResponse = await fetch(`/infoUser?token=${props.token}`);
        const response = await rawResponse.json();
        setUserMail(response.userInfo.email)
        console.log(response)}

        ProfilComplete();
  



    if (validation == true) {
        return (<Redirect to='/pageprofil' />)
    }

    //selection du genre //
    const Genre = [
        {
            value: "homme",
            label: "homme",
        },
        {
            value: "femme",
            label: "femme",
        }, {
            value: "autres",
            label: "autres",
        }]

    function onChange(value) {
        var Genre = value;
        setGender(Genre);
    }
    // selection CSP
    const categorie = [
        {
            value: "salarié",
            label: "salarié",
        },
        {
            value: "cadre",
            label: "cadre",
        }, {
            value: "sans emploi",
            label: "sans emploi",
        }, {
            value: "Personne au foyer",
            label: "Personne au foyer",
        },
        {
            value: "profession libérale",
            label: "profession libérale",
        }, {
            value: "Chef d'entreprise",
            label: "Chef d'entreprise",
        }]

    function onCategorie(value) {
        var categorie = value;
        setCsp(categorie);
    }

    // civil
    const Statut = [
        {
            value: "marié",
            label: "marié",
        },
        {
            value: "célibataire",
            label: "célibataire",
        }, {
            value: "en couple",
            label: "en couple",
        }, {
            value: "pacsé",
            label: "pacsé",
        }]

    function onStatut(value) {
        var Statut = value;
        setCivilState(Statut);
    }

    return (
        <Layout className="site-layout-background">
        <div id="head">
          <div style={{height:"100px"}}>
            <Image
              preview={false}
              size={30}
              className="logo"
              width={150}
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

        
          </div>


        <Layout className="site-layout-background">
          <SideBarDroite />
          <Content
            style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
          >
          
          <div className="Complete">
          <h3 style={{ color: "white", display:'flex', justifyContent:"center" }}> Mes infos personnelles </h3>
          <p style={{ color: "black"}} > Mon email : {userMail}  </p>
          <p style={{ color: "black"}} > Modifier mon mot de passe : </p>
        </div>

<div className="Complete">
    <h3 style={{ color: "white", display:'flex', justifyContent:"center" }}> Compléter mon profil </h3>



    <Cascader style={{ display:'flex', justifyContent:"center", alignItems:"center" }}
        className="cascade"
        options={Genre}
        onChange={onChange}
        placeholder="Genre"
    />


    <Form.Item name="input-number" noStyle style={{ display:'flex', justifyContent:"center", alignItems:"center" }}>
        <InputNumber min={1930} max={2010} onSelect={(e) => setDateOfBirth(e.target.value)} className="Login-input" placeholder="DateOfBirth" />
    </Form.Item>

    <Cascader
        className="cascade"
        options={categorie}
        onChange={onCategorie}
        placeholder="Please select"
    />




    <Cascader
        className="cascade"
        options={Statut}
        onChange={onStatut}
        placeholder="Please select"
    />


    <Form.Item name="input-number" height="100px">
        <InputNumber min={0} max={10} onSelect={(e) => setNumberOfcChild(e.target.value)} className="Login-input" placeholder="number of child" />
    </Form.Item>




    <Button onClick={() => handleSubmitComp()}  >Valider les informations </Button>
    
    </div>
 
    

            
    </Content>
      </Layout>
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
      <>
        <BackTop />
      </>
    </Layout>
        


        

    );
}

function mapStateToProps(state) {
    return { token: state.token }
}





export default connect(
    mapStateToProps,
    null

)(Profilcomp)