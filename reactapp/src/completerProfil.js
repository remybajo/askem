import React from "react";
import { Link, Redirect } from "react-router-dom";
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
  Input,
  Tooltip,
  Radio,
  Form,
  Tabs,
  List,
  Space,
  Tag,
  BackTop,
  Badge,
  Upload,
  message,
  Select,
  InputNumber,
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
  InfoCircleOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import EnTete from "./EnTete";
const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;
// import {Redirect} from 'react-router-dom';
// import {connect} from 'react-redux';

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function CompleterProfil(props) {
  return (
    
    /* header */
    <Layout className="site-layout-background">
      <EnTete />
      <Content>
        <Row justify="center">
          <Col span="4"></Col>
          <Col span="16">
            <h1 
              style={{
                backgroundColor: "#214C74",
                color: "white",
                width: "100%",
                textAlign: "center",
                height: 50,
                justifyContent: "center",
              }}
            >
            <Link to="/profilcomp"> MON PROFIL </Link>
            </h1>
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={12}>
            Nom
            <Input placeholder="Basic usage" /> <br />
            <br />
            Prenom
            <Input placeholder="Basic usage" />
            <br />
            <br />
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Pseudo">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Divider dashed />
            <Form.Item
              name="select-multiple"
              label="Statut"
              rules={[
                {
                  required: true,
                  message: "Please select your favourite colors!",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="célibataire">
                <Option value="red">Célibataire</Option>
                <Option value="green">En couple</Option>
                <Option value="blue">Marié</Option>
                <Option value="blue">Pacsé</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="radio-button"
              label="Radio.Button"
              rules={[
                {
                  required: true,
                  message: "Please pick an item!",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="a">25-35 ANS</Radio.Button>
                <Radio.Button value="b">36-45 ANS</Radio.Button>
                <Radio.Button value="c">46-55 ANS</Radio.Button>
                <Radio.Button value="c">56-65 ANS</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <br />
            <br />
            <Form.Item label="Nombre d'enfants">
              <Form.Item name="input-number" noStyle>
                <InputNumber min={0} max={10} />
              </Form.Item>
              <br />
              <br />
              <span className="ant-form-text"></span>
            </Form.Item>
            <Divider dashed />
          </Col>
          <Col span={12}>
            {" "}
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Importer votre photo de profil</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Col>
        </Row>
        <br />
        <br />

        <Button type="primary" htmlType="submit">
          VALIDER
        </Button>
      </Content>

      <Footer>
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
    </Layout>
  );
}

export default CompleterProfil;
