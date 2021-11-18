import React, { useState, useEffect } from "react";
import "./nouvelPublication.css";
import {
  Layout,
  Menu,
  Button,
  Image,
  Empty,
  Cascader,
  Input,
  Space,
  Row,
  Col,
  Form,
  Divider,
} from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap pour le moment utilisé pour le modal avec les images en provenance de l'APIK
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";

import Politique from "../src/image/Politique.jpg";
import Education from "../src/image/Education.jpg";
import Emploi from "../src/image/Emploi.jpg";
import Environnement from "../src/image/Environnement.jpg";
import Evenement from "../src/image/Evenement.jpg";
import Remarquer from "../src/image/Remarquer.jpg";
import Sport from "../src/image/Sport.jpg";
import Tourisme from "../src/image/Tourisme.jpg";
import PiedDePage from "./piedDePage";
import SearchBar from "./Components/SearchBar";
import AGORA from "../src/image/AGORA.png";
import Header from "./Header";
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
  const [motCle, setMotCle] = useState([]);
  const [date, setDate] = useState();
  const [theme, setTheme] = useState();
  const [redir, setRedir] = useState(false);

  // hook d'état pour gestion de l'image
  const apiKey = "23345038-9d4a0f31be7a8f5a5e2bfc293";
  const [mot_Cle, setMot_Cle] = useState("");
  const [foundPictures, setFoundPictures] = useState([]);
  const [modal, setModal] = useState(false);
  const [pictureSelected, setPictureSelected] = useState("");
  const [validatePicture, setValidatePicture] = useState(false);
  const [id, setId] = useState();
  const [image, setImage] = useState();
 
  var illustration;
  var border = { border: "" };
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
  }, [theme]);

  var postPublication = async () => {
    const data = await fetch("/post-publication", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&motClePublication=${motCle}&token=${props.token}&image=${image}`,
    });

    const body = await data.json();
    console.log("et dans body?", body);
    // if (body.result == true) {
    //   props.addPubliToken(body.publiToken);
    idP = body.id;
    // return <Redirect to="/publication" />

    if (body.result == true) {
      setRedir(true);
    }
    setId(idP);

    //sauvegarde image
    const sendImage = async () => {
      var image = new FormData();
      image.append("image", {
        uri: pictureSelected,
        type: "image/jpeg",
        name: "image.jpg",
      });

      let rawResponse = await fetch("/publications/upload", {
        method: "post",
        body: image,
      });
    };
  };

  if (id) {
    console.log("id", id);
    return <Redirect to={`/publication/${id}`} />;
  }

  /* return <Redirect to={`/publication/${id}`} />} */

  // var cherchePubli = async () => {
  //   setRedir(true)
  // if (redir == true) {
  //   console.log("ICI APPARAISSENT LES SAINTS PROPS!!!", id);
  // const actual = await fetch (`/selectedPublication?id=${id}`)
  // const Ractual = await actual.json()
  //     setId(idP)
  //   console.log("idd", idP)
  // return <Redirect to={`/publication/${id}`} />;

  const options = [
    {
      value: "Politique",
      label: "Politique",
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
      value: "Evenement",
      label: "Evenement",
    },
    {
      value: "Sport",
      label: "Sport",
    },
    {
      value: "Tourisme",
      label: "Tourisme",
    },
    {
      value: "Remarquer",
      label: "Tas remarqué?",
    },
    {
      value: "Nutrition",
      label: "Nutrition",
    },
    {
      value: "Santé",
      label: "Santé",
    },
    {
      value: "Technologie",
      label: "Technologie",
    },
    {
      value: "Transport",
      label: "Transport",
    },
    
  ];

  function onChange(value) {
    console.log("ma value", value);
    var thematique = value;
    setTheme(thematique);
  }

  const onSearch = (value) => {
    var listeMotCle = motCle;
    listeMotCle.push(value);
    console.log("ma value", value);
    setMotCle(listeMotCle);
  };

  


  // if (pictureSelected && validatePicture) {
  var illustration = (
    <Card style={{ width: "640px", height: "360px" }}>
      <CardImg width="100%" height="100%" src={image} alt="Pour voir apparaître la photo, choisissez un thème" />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText></CardText>
      </CardBody>
    </Card>
  );
  // }

  console.log("dans image", image);

  var imageP = () => {
    if (theme == "Politique") {
      setImage(Politique);
    } else if (theme == "Education") {
      setImage(Education);
    } else if (theme == "Environnement") {
      setImage(Environnement);
    } else if (theme == "Emploi") {
      setImage(Emploi);
    } else if (theme == "Evenement") {
      setImage(Evenement);
    } else if (theme == "Remarquer") {
      setImage(Remarquer);
    } else if (theme == "Sport") {
      setImage(Sport);
    } else if (theme == "Tourisme") {
      setImage(Tourisme);
    } else if (theme == "Nutrition") {
      setImage(Nutrition);
    } else if (theme == "Santé") {
      setImage(Santé);
    } else if (theme == "Technologie") {
      setImage(Technologie);
    } else if (theme == "Transport") {
      setImage(Transport);
  };}

 

  return (
    <div className="site-layout-background">
     <Header/>

      
      
    

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
              <Search
                placeholder="exemple: cantine/ école primaire"
                allowClear
                enterButton="Ajouter un mot-clé"
                size="large"
                onSearch={onSearch}
              />
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
  return { token: state.token, publiToken: state.publiToken };
}

function mapDispatchToProps(dispatch) {
  return {
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NouvelPublication);
