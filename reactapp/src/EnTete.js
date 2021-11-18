import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Image,
  Divider,
  Row,
  Col,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import"./App.css"
import {
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Inscription from "./inscription";

function EnTete(props) {
  console.log("les props de la page entete", props);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <Row span={24}>
      <Modal
        title={connexion}
        style={{ displayflex: 1, width: 150 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Inscription />{" "}
      </Modal>

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
            size={60}
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

        <div style={{ marginTop: "20px", marginLeft: "40px" }}>
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
    </Row>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}



export default connect(mapStateToProps, null)(EnTete);
