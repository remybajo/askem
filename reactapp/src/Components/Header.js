import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import SearchBar from "./SearchBar";
import Inscription from "./inscription";
import { connect } from "react-redux";
import {Image, Modal } from "antd";




function Header(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
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
      

        
      

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
           <p style={{ marginLeft: "50px", fontWeight:"bold" }}>
       
            Ensemble, créons le programme commun.
          </p>
    
      
        
            {token == null ?
            <Button  onClick={() => handleClick()}
          size={20}
            type="text"
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
          >
            Connexion
          </Button>
          :
          <div style={{padding:5, fontWeight:'bold', display:'flex'}}>
         
          <Button onClick={() => props.deleteToken(token)}
            type="link"
            type="text"
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
            ><Link to="/">Déconnexion</Link>
          </Button>
          
          </div>
          }
            
           
          </div>
        
       
        <div style={{display:"flex", justifyContent:"center", borderRadius:"100%"}}>
          
         
        <SearchBar  placeholder="chercher une proposition" data={publicationT}/>
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
