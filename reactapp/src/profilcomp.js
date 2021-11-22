
import "./App.css"

import { connect } from 'react-redux'
import React, { useState} from "react";
import { Redirect } from "react-router-dom";
import {
  Layout,
  Button,
  Cascader,
  Form,
  Row,
  Col,
  InputNumber,
  BackTop,
} from "antd";
import "antd/dist/antd.css";
import Header from "./Components/Header";
import SideBarDroite from "./Components/SideBarDroite";


const { Content, Footer,  } = Layout;





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
        }

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
       <Header/>


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