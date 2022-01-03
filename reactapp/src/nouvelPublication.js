import React, { useState, useEffect } from "react";
import "./nouvelPublication.css";
import {
  Layout,
  Button,
  Cascader,
  Input,
  Space,
  Row,
  Col,
  Divider,
} from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap pour le moment utilisé pour le modal avec les images en provenance de l'APIK
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

import SideBarDroite from "./Components/SideBarDroite";

import LAREM from "../src/image/LAREM.png"
import LO from "../src/image/LO.png";
import LFI from "../src/image/LFI.png";
import LR from "../src/image/LR.png";
import EELV from "../src/image/EELV.png";
import MD from "../src/image/MD.png";
import PCF from "../src/image/PCF.png";
import PRG from "../src/image/PRG.png";
import PS from "../src/image/PS.png";
import RN from "../src/image/RN.png";
import UDI from "../src/image/UDI.png";
import NPA from "../src/image/NPA.png";

import PiedDePage from "./Components/piedDePage";

import Header from "./Components/Header";


const { Footer, Sider, Content } = Layout;
const { Search } = Input;

function NouvelPublication(props) {
  var ladate = new Date();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [date, setDate] = useState();
  const [theme, setTheme] = useState();
  const [redir, setRedir] = useState(false);
  const [parti, setParti]=useState("");

  // hook d'état pour gestion de l'image
  const [id, setId] = useState();
  const [image, setImage] = useState();
  var illustration;
  var idP = "";

  useEffect(() => {
    var dateKnow = async () => {
      const ladateK =
        ladate.getFullYear() +
        "/" +
        (ladate.getMonth() + 1) +
        "/" +
        ladate.getDate();
      setDate(ladateK);
    };
    dateKnow();
  }, []);

  useEffect(() => {
    imageP();
  }, [parti]);

  var postPublication = async () => {
    const data = await fetch("/publications/post-publication", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&parti=${parti}&token=${props.token}&image=${image}`,
    });

    const body = await data.json();
    idP = body.id;
    if (body.result == true) {
      setRedir(true);
    }
    setId(idP);
  };

  if (id) {
    return <Redirect to={`/publication/${id}`} />;
  }

  const partisImage = [
    {
      value: "LFI",
      label: "LFI",
    },{
      value: "Lutte ouvrière",
      label: "Lutte ouvrière",
    },{
      value: "Nouveau Parti anticapitaliste" ,
      label: "Nouveau Parti anticapitaliste",
    },{
      value: "Parti communiste français",
      label: "Parti communiste français",
    },{
      value: "Europe Écologie Les Verts",
      label: "Europe Écologie Les Verts",
    },{
      value: "Parti socialiste",
      label: "Parti socialiste",
    },{
      value: "Parti radical de gauche",
      label: "Parti radical de gauche",
    },{
      value: "La République en marche",
      label: "La République en marche",
    },{
      value: "Mouvement démocrate",
      label: "Mouvement démocrate",
    },{
      value: "Union des démocrates et indépendants",
      label: "Union des démocrates et indépendants",
    },{
      value: "Les Républicains",
      label: "Les Républicains",
    },{
      value: "Rassemblement national",
      label: "Rassemblement national",
    },
 ]

  const options = [
    {
      value: "Politique Exterrieure",
      label: "Politique Exterrieure",
    },
    {
      value: "Education",
      label: "Education",
    },
    {
      value: "Emploi",
      label: "Emploi",
    },
    {
      value: "Environnement",
      label: "Environnement",
    },
    {
      value: "Economie",
      label: "Economie",
    },
    {
      value: "Politique Intérrieure",
      label: "Politique Intérrieure",
    },
  
    {
      value: "Santé",
      label: "Santé",
    },
  
    {
      value: "Transport",
      label: "Transport",
    },
    {
      value: "Culture",
      label: "Culture",
    },
    {
      value: "Agriculture et Alimentation",
      label: "Agriculture et Alimentation",
    },
    {
      value: "Social",
      label: "Social",
    }];

  function onChange(value) {
    var thematique = value;
    setTheme(thematique);
  }

  function onParti(value) {
    var parti = value;
    setParti(parti);
  }

  
  // if (pictureSelected && validatePicture) {
  var illustration = (
    <Card style={{ width: "640px", height: "360px" }}>
      <CardImg
        width="100%"
        height="100%"
        alt="Pour voir apparaître la photo, choisissez un thème"
      />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText> {parti}</CardText>
      </CardBody>
    </Card>
  );
  // }

  

  var imageP = () => {
    if (parti == "LFI") {
      setImage(LFI);
    } else if (parti == "Lutte ouvrière") {
      setImage(LO);
    } else if (parti == "Nouveau Parti anticapitaliste") {
      setImage(NPA);
    } else if (parti == "Parti communiste français") {
      setImage(PCF);
    } else if (parti == "Europe Écologie Les Verts") {
      setImage(EELV);
    } else if (parti == "Parti socialiste") {
      setImage(PS);
    } else if (parti == "Parti radical de gauche") {
      setImage(PRG);
    } else if (parti == "La République en marche") {
      setImage(LAREM);
    } else if (parti == "Mouvement démocrate") {
      setImage(MD);
    } else if (parti == "Union des démocrates et indépendants") {
      setImage(UDI);
    } else if (parti == "Les Républicains") {
      setImage(LR);
    } 
    else if (parti == "Rassemblement National") {
      setImage(RN);}
  };

  return (
    <div className="site-layout-background">
      <Header />

      <Row>
        <SideBarDroite />

        <Col span={17} align="center">
          <div
            style={{
              border: "1px solid black",
              width: "640px",
              height: "360px",
              display: "center",
            }}
          >
            {illustration}
          </div>
          <div className="montimer">
            <span className="timer">{date}</span>
          </div>
          <div className="maflex">
            <Cascader
              className="cascade"
              options={options}
              onChange={onChange}
              placeholder="Choisir un thème"
            />
            <Divider type="vertical" />

            <Space direction="vertical">
             
            </Space>
            <Divider type="vertical" />
          </div>
          <div className="maflex">
            <Cascader
              className="cascade"
              options={partisImage}
              onChange={onParti}
              placeholder="Parti"
            />
            <Divider type="vertical" />

            <Space direction="vertical">
             
            </Space>
            <Divider type="vertical" />
          </div>
          <Input
            className="description"
            placeholder="Votre titre"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Input
            className="description"
            placeholder="Votre texte"
            onChange={(e) => setContenu(e.target.value)}
            style={{ height: "100px" }}
          />
          <div className="monbouton">
            <Button className="bouton" onClick={() => postPublication()}>
              Publier
            </Button>
          </div>
        </Col>
        <Col span={3}>
          {" "}
          <div id="illustNewPub"> </div>
        </Col>
      </Row>
      <PiedDePage />
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(NouvelPublication);
