import React, { useState, useEffect, } from "react";
import { connect } from 'react-redux'
import { useParams } from "react-router";
import { Link} from "react-router-dom";

function Validation () {
  
    var {email} = useParams()
console.log({email});

    
        
            var RecupEmail = async (props) => {
              var rawResponse = await fetch(`/validation?email=${email}`);
              const response = await rawResponse.json();}
              
       


    return (
        <div> 
            <div className="Sign">
            <Link to="/">
            <input style={{display:'flex',justifyContent:'center', alignItems:"center", marginLeft:"600px"}} onClick={() => RecupEmail()} 
          type="submit"
          value="Valider mon mail"
          
        /> </Link>
           </div>
        </div>
    )
 
}
function mapStateToProps(state){
  return {token:state.token}
}

function mapDispatchToProps(dispatch) {
  return {
      addToken: function (token) {
          dispatch({ type: 'addToken', token: token },
         
          )
         
      
  }}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
 
)(Validation)