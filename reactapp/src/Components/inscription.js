import React, { useState, useEffect, useRef } from 'react';
import "../App.css"
import { Input, Button,  } from 'antd';

import { connect } from 'react-redux'
import emailjs from "emailjs-com";


function Inscription(props) {
    console.log("les props de la page inscription",props)

    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpVerifPassword, setSignUpVerifPassword] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignin, setErrorsSignin] = useState([])
    const [listErrorsSignup, setErrorsSignup] = useState([])
    const [isSuccess, setIsSuccess] = useState("");


    //mail de validation 
    // var form = useRef();

    // const sendEmail = (e) => {
    //   e.preventDefault();
    //   emailjs
    //     .sendForm(
    //       "gmail",
    //       "template_gjqpj1o",
    //       form.current,
    //       "user_Pk2WBbkI4D2OI2eKvtopA"
    //     )
  
    //     .then(
    //       (result) => {
    //         console.log(result.text);
    //       },
    //       (error) => {
    //         console.log(error.text);
    //       }
    //     );
    // };



    var handleSubmitSignup = async () => {

      const data = await fetch('/sign-up', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&passwordVerifFromFront=${signUpVerifPassword}`
      })


      const body = await data.json()
      console.log(body)
      if (body.result == true) {
          setUserExists(true);
          props.addToken(body.token)
          setIsSuccess("tu es connecté !")
          
        
      } else {
          setErrorsSignup(body.error)
      }
     
      
  }
 

  var handleSubmitSignin = async () => {

      const data = await fetch('/sign-in', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
      })

      const body = await data.json()
      console.log(body)
      if (body.result == true) {
          setUserExists(true);
          setIsSuccess("tu es connecté !")
          props.addToken(body.token)
        
          
      } else {
          setErrorsSignin(body.error)
      }
      
  }

  

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
      return (<p key={i}>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
      return (<p key={i}>{error}</p>)
  })

  useEffect(() => {
      if(props.token == null) {
          setUserExists(false)
      }
  }, [props.token])

   if (userExists) { 
  //   return <Link to={window.location.href}/>
      return <div style={{ color: "#214C74", fontWeight: "bolder", fontSize: "2em"}}>vous etes connecté!</div>
  }


    return (
        
        
      <div>
      {isSuccess}
       
         
             <div className="Sign">
                 <h3 style={{ color: "white", display:'flex', justifyContent:'center' }}> Je suis déjà inscrit </h3>

                 <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />

                 <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />
                 <div style={{display:'flex',justifyContent:'center', color:"red"}}>
                 {tabErrorsSignin}
                 </div>

                 <Button onClick={() => handleSubmitSignin()} type="primary" style={{ backgroundColor:'white', color :"black" }}>Sign-in</Button>

             </div>
             <div className="Sign">

                 <h3 style={{ color: "white", display:'flex', justifyContent:'center' }}> Je n'ai pas de compte </h3>

                 <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="username" />

                 <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="email" />

                 <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="password" />

                 <Input.Password onChange={(e) => setSignUpVerifPassword(e.target.value)} className="Login-input" placeholder="verif password" />

                 <div style={{display:'flex',justifyContent:'center', color:"red"}}>
                 {tabErrorsSignup}
                 </div>

                 <Button onClick={() => handleSubmitSignup()} style={{ backgroundColor:'white', color :"black" }} type="primary" >Sign-up</Button>

             </div>
                {/* <form ref={form} onSubmit={sendEmail} className="Sign">
        <h3
          style={{ color: "white", display: "flex", justifyContent: "center" }}
        >
          {" "}
          Je n'ai pas de compte{" "}
        </h3>

        <Input
          onChange={(e) => setSignUpUsername(e.target.value)}
          className="Login-input"
          type="text"
          placeholder="username"
          name="name"
        />

        <Input
          onChange={(e) => setSignUpEmail(e.target.value)}
          className="Login-input"
          type="email"
          placeholder="email"
          name="email"
        />

        <Input.Password
          onChange={(e) => setSignUpPassword(e.target.value)}
          className="Login-input"
          type="password"
          placeholder="password"
          name="password"
        />

        <Input.Password
          onChange={(e) => setSignUpVerifPassword(e.target.value)}
          className="Login-input"
          type="password"
          placeholder="verif password"
        />

        <div
          style={{ display: "flex", justifyContent: "center", color: "red" }}
        >
          {tabErrorsSignup}
        </div>

        <input
          type="submit"
          value="Send"
          onClick={() => handleSubmitSignup()}
        />
      </form> */}
  
                

         </div>
    
    );
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
 
)(Inscription)