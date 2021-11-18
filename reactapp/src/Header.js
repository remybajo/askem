import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AGORA from "../src/image/AGORA.png"
import SearchBar from "./Components/SearchBar";
import Inscription from "./inscription";
import { connect } from "react-redux";
import {Image, Modal } from "antd";


function Header(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConnect, setIsConnect] = useState(false);
    const [isConnectProfil, setIsConnectProfil] = useState(false);
    const [publicationTitre, setPublicationTitre] = useState();
    var token = props.token;

    const findPublications = async () => {
      const toutePublication = await fetch("/searchPublication");
      const res_publication = await toutePublication.json();
      console.log("ma res_publication", res_publication.allPublications)
      setPublicationTitre(res_publication.allPublications)
    }; 

    useEffect(() => {
       findPublications()
    }, []);

    var publicationT=publicationTitre;

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
        }
      };
    
    return ( 
       
        <div id="head" style={{display:"flex", margin:0}}>
       <Modal
        style={{ displayflex: 1, width: 150 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Inscription />{" "}
      </Modal>
        <div >
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Image
            preview={false}
            size={40}
            className="logo"
            width={150}
            src={AGORA}
          />
           <div className="searchbar" style={{display:"flex", justifyContent:"center"}}>
        <SearchBar  placeholder="chercher une publication" data={publicationT}/>
      </div>
          <div>
            {token == null ?
            <Button  onClick={() => handleClick()}
          size={20}
            type="text"
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
          >
            LOG IN
          </Button>
          :
          <div style={{padding:5, fontWeight:'bold', display:'flex'}}>
            <p style={{padding:5, fontWeight:'bold'}}>Vous êtes connecté(e)</p>
          <Button onClick={() => props.deleteToken(token)}
            type="link"
            type="text"
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
            ><Link to="/">LOG OUT</Link>
          </Button>
          
          </div>
          }
            </div>
            </div>
          <div>
           <p style={{ marginLeft: "50px", fontWeight:"bold" }}>
            {" "}
            Donnez votre avis d'une manière différente{" "}
          </p>
          </div>
        </div>
       
        <div>
          
         
          
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

        
        
      </div>
    )
}
function mapStateToProps(state) {
    return { token: state.token };
  }

  function mapDispatchToProps(dispatch) {
    return {
        deleteToken: function (token) {
            dispatch({ type: 'deleteToken', token: token },
           
            )
           
        
    }}
}

  export default connect (
    mapStateToProps,
    mapDispatchToProps
    )(Header)
