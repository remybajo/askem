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

import LFI from "../src/image/LFI.jpeg";
import Education from "../src/image/Education.jpg";
import Emploi from "../src/image/Emploi.jpg";
import Environnement from "../src/image/Environnement.jpg";
import Evenement from "../src/image/Evenement.jpg";
import Remarquer from "../src/image/Remarquer.jpg";
import Sport from "../src/image/Sport.jpg";
import Tourisme from "../src/image/Tourisme.jpg";
import PiedDePage from "./Components/piedDePage";

import Header from "./Components/Header";
import Nutrition from "../src/image/Nutrition.jpg";
import Santé from "../src/image/Santé.jpg";
import Technologie from "../src/image/Technologie.jpg";
import Transport from "../src/image/Transport.jpg";

const { Footer, Sider, Content } = Layout;
const { Search } = Input;

function NouvelPublication(props) {
  var ladate = new Date();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [date, setDate] = useState();
  const [theme, setTheme] = useState();
  const [redir, setRedir] = useState(false);

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
  }, [image]);

  var postPublication = async () => {
    const data = await fetch("/publications/post-publication", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&token=${props.token}&image=${image}`,
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

  const partis = [
    {
      value: "LFI",
      label: "LFI",
    },]

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
    var image = value;
    setImage(image);
  }

  
  // if (pictureSelected && validatePicture) {
  var illustration = (
    <Card style={{ width: "640px", height: "360px" }}>
      <CardImg
        width="100%"
        height="100%"
        src={image}
        alt="Pour voir apparaître la photo, choisissez un thème"
      />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText></CardText>
      </CardBody>
    </Card>
  );
  // }

  var imageP = () => {
    if (image == "Education") {
      setImage(Education);
    } else if (image == "Education") {
      setImage(Education);
    } else if (image == "Environnement") {
      setImage(Environnement);
    } else if (image == "Emploi") {
      setImage(Emploi);
    } else if (image == "Evenement") {
      setImage(Evenement);
    } else if (image == "Remarquer") {
      setImage(Remarquer);
    } else if (image == "Sport") {
      setImage(Sport);
    } else if (image == "Tourisme") {
      setImage(Tourisme);
    } else if (image == "Nutrition") {
      setImage(Nutrition);
    } else if (image == "Santé") {
      setImage(Santé);
    } else if (image == "Technologie") {
      setImage(Technologie);
    } else if (image == "Transport") {
      setImage(Transport);
    }
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
              options={options}
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
