import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import {
  Radio,  Layout,  Menu,  Button,  Row,  Col,  Tabs,  List,  Space,  Comment,  Form,
  Input, Alert} from "antd";
import { connect } from "react-redux";

import Plot from 'react-plotly.js';
import SearchBar from "./Components/SearchBar";
import "./publication.css";
import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";
import AGORA from "../src/image/AGORA.png"
import Inscription from "./inscription";
import Header from "./Header";
import Commentaires from "./commentaires"

function Publication(props) {
  const { Footer, Sider, Content } = Layout;

  var { id } = useParams();
  
  const [vote, setVote] = useState("");
  const [selection, setSelection] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCom, setMessageCom] = useState("");
  const [boutonVali, setBoutonVali] = useState("Valider le choix");
  const [comment, setComment] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [boutonValiCom, setBoutonValiCom] = useState("Envoyer le commentaire");
  const [commentairesList, setCommentairesList] = useState([]);
  const [currentPubli, setCurrentPubli] = useState();
  const [publiExist, setPubliExist] = useState(false);
  const [list, setList] = useState();
  const [stats, setStats] = useState();
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [alreadyCommented, setAlreadyCommented] = useState(false);
  const [userVote, setUserVote] = useState();
  const [nbVoters, setNbVoters] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [connected, setConnected] = useState(false);
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0)
  const [likeComment, setLikeComment] = useState(false)
  const [gender, setGender] = useState();
  const [publicationTitre, setPublicationTitre] = useState();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [actionLike, setActionLike] = useState("");
  const [actionDislike, setActionDislike] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [isConnectProfil, setIsConnectProfil] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);



  const [listVotes, setListVotes] = useState([{vote: "J'Adore", color: "#33EE22", border:""}, {vote: "Je suis Pour", color: "#93c47d", border:""}, {vote: "Je suis Mitigé(e)", color: "#ffd966", border:""}, {vote: "Je suis Contre", color: "#ffa500", border:""}, {vote: "Je Déteste", color: "#f44336", border:""}])

  //const [border, setBorder] = useState("");

  var newComment = {};
  var topComments = []

  const [idC, setIdC] = useState(0)


  const { TextArea } = Input;
  const { TabPane } = Tabs;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  var date;
  var dateComment;
  var token = props.token;
  
  const [content, setContent] = useState({_id:"",thematique:"", titre:"" ,texte: "", image: "", date_publication: '', statut: "", motsCle: '',
  publiToken: "", user_id: "", __v: ""});

  const [user, setUser] = useState({ id:"", username: "",  email: "", password:"", token: "", __v: 0,
  gender: "", dateOfBirth: null, CSP: "", civilState: "", numberOfcChild: ""});


  var dateFormat = function (date) {
    var newDate = new Date(date);
    var format = newDate.getFullYear()  + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate()  ;
    return format;
  };

  const getSelectedPublication = async() => {
    const publication = await fetch(`/publications/selectedPublication?id=${id}&token=${token}`)
    var body = await publication.json();

    //récupérer la publication
    setContent(body.publiToDisplay);

    // si l'utilisateur n'est pas loggé, cacher des éléments
    if(token)  {
      setConnected(true);
    } else {
      setConnected(false)
    }
    
    // recuperation des commentaires liés à la publication
    setCommentairesList(body.comments);
    //recuperations des stats liées à la publication
    setStats(body.stats);

    // récupérer les données du user
    if(token) {
      if(token == body.user.token){
        setUser(body.user)
      }
    }

    //vérifier si l'utilisateur a déjà voté et récupérer son vote le cas échéant
    if (token) {
      var voted = body.votes.filter(vote => vote.user_id == body.user._id);
      if (voted.length > 0) {
        setAlreadyVoted(true);
        setStatus(true)
        setUserVote(voted[0].vote)
        setNbVoters(body.nbVoters)
      } 

      var commented = body.comments.filter(comment => comment.user_id == body.user._id);
      if (commented.length > 0) {
        setAlreadyCommented(true)
        setUserComment(commented[0].commentaire)
      } else {
        setAlreadyCommented(false)
      }
  
    } else {
      setAlreadyVoted(false);
      setStatus(false);
      setAlreadyCommented(false)
    }
    setGender(body.gender);
    console.log("body gender ", body.gender)

    setMessage("");
  }

  //recupération données bar de recherche
  useEffect(() => {
    const findPublications = async () => {
        const toutePublication = await fetch("/searchPublication");
        const res_publication = await toutePublication.json();
        console.log("ma res_publication", res_publication.allPublications)
        setPublicationTitre(res_publication.allPublications)
    }; findPublications()
}, []);
var publicationT=publicationTitre

  //récupérer le contenu de la publication sélectionnée, des commentaires associés et des stats associées
  useEffect(async() => {
    // Afficher tout
    getSelectedPublication(); 
  },[])

  console.log("check nb Voters: ", nbVoters)

  useEffect(() => {
    getSelectedPublication();
  }, [token])
  
  // Récup des nouveaux commentaires via le reducer pour le re-render des top commentaires
  // useEffect(() => {
  //   console.log("comment from reducer: ", props.commentairesList)
  //   setCommentairesList([...commentairesList, props.commentairesList[props.commentairesList.length-1]])
  //   //commentairesList.push(props.commentairesList)
  // }, [props.commentairesList])
  
  console.log("comment after update of commentairesList: ", commentairesList)

  // mise à jour de la sélection pour le vote
  useEffect(() => {
    if(selection) {
      setVote(selection);
      setMessage("");
    } else {
      setVote('');
      setMessage("");
    }
  }, [selection]); 
  
  var handleBorder = (element) => {
    var items = [];
    var index = element.element;
    console.log("check index: ", index)
    for (var i=0; i<listVotes.length; i++) {
      if (i == index){
        items = [...listVotes];
        items[i].border = "solid blue";
        setListVotes(items)
      } else {
        items = [...listVotes];
        items[i].border = "";
        setListVotes(items)
      }
    }
  }

  // requête pour l'envoi du vote en bdd - utilisée dans la fonction voteValidation()
  var sendVote = async () => {
    await fetch("/votes/sendVote", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `vote=${vote}&publication=${id}&date=${date}&token=${token}`,
    });
  };

  // validation du vote au click sur bouton valider

  var voteValidation = () => {
    console.log("check selection: ", selection)
    console.log("check vote: ", vote)
    if (!vote) {
      setMessage(<Alert message="Veuillez choisir une option de vote avant de valider." type="error" showIcon />);
    } else if (!token) {
      setMessage(<Alert message="Veuillez vous identifier avant de voter." type="error" showIcon />);
    } else if (vote && !status) {
      setStatus(true);
      setMessage(<Alert message="Votre vote a bien été pris en compte. Merci pour votre participation." type="success" showIcon />);
      setAlreadyVoted(true);
      date = dateFormat(Date.now());
      sendVote();
      getSelectedPublication(); 
    }
    console.log("vote: ",vote);
  };


 // requête pour envoi du vote en bdd, utilisée dans la fonction commentValidation()
  var sendComment = async () => {
    await fetch("/comments/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `commentaire=${comment}&publication=${id}&date=${dateComment}&token=${token}&vote=${userVote}`,
    });
  };


  // validation du commentaire pour enregistrement bdd
  var commentValidation = () => {
    if (!comment) {
      setMessageCom(<Alert message="Aucun commentaire saisi" type="error" showIcon />);
    } else if (!token) {
      setMessageCom(<Alert message="Veuillez vous identifier pour envoyer un commentaire" type="error" showIcon />);
    } else if (!userVote) {
      setMessageCom(<Alert message="Veuillez voter avant d'envoyer un commentaire" type="error" showIcon />);
    } else {
      dateComment = dateFormat(Date.now());
      console.log("date commentaire: ", dateComment);
      sendComment();
      // newComment = {commentaire: comment, vote: userVote, nb_likes: 0, nb_dislikes:0};
      // console.log("new comment object: ", newComment)
      // props.addComment(newComment);
      setComment("");
      setMessageCom(<Alert message="Votre commentaire a bien été envoyé." type="success" showIcon />);
      getSelectedPublication();
    }
  }

  // supprimer son commentaire
  var commentSuppr = async () => {
    setUserComment("");
    await fetch(`/publications/deleteComment?id=${id}&token=${token}`, {
      method: 'DELETE'
    });
    setMessageCom("Le commentaire a bien été supprimé.")
    getSelectedPublication(); 
  
    //setAlreadyCommented(false)
  }

  var labels = [];
  var values = [];
  var genderLabels = [];
  var genderValues = [];

  if(gender) {
    gender.map(gender => genderLabels.push(gender.genre));
    gender.map(gender => genderValues.push(gender.nbre));
  }

  if(stats) {
    
    stats.map(stat => labels.push(stat._id));
    stats.map(stat => values.push(stat.userCount));
   }

  var voteArea = () => {
    if (alreadyVoted == true) {
      setStatus(true)
    } 
  }
//show Modal
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
        setIsConnectProfil(false)}

        if (isConnectProfil == false){
      showModal();}
  };

  var deleteClick = (e) => {
    setIsConnectProfil(false)
  }


  var data = [
    {
      values: values, 
      labels: labels,
      type: "pie",
      hoverinfo: 'none',
      text: labels,
      hoverinfo: 'none'
    }];

    var dataGender = [
      {
        values: genderValues, 
        labels: genderLabels,
        type: "pie",
        hoverinfo: 'none',
        text: genderLabels,
        hoverinfo: 'none',
        marker: {'colors': [
          "#FFC806", 
          "#EDAC06",  
         ] 
      },
      }];


  return (
    <Layout className='layout' style={{ margin: 10, backgroundColor:'white'}}>
    
      <Header/>
        
     
      <Layout style={{height:"100vh"}}>
        
        <SideBarDroite/>
      <Content>   
      <Row
        gutter={{ xs: 24, sm: 24, md: 12 }}
        className="site-layout-background"
        justify="center"
        align="top"
        style={{ margin:0, padding:0, height:"50vh", width:"90vw",display: "flex", alignItem:'center' }}
      >

          <Col
            span={7} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",          
              margin: 5,
              width:'30%',
              height:"100%"                     
            }}
          >
            <h1 style={{ color: "#37A4B2", fontSize: "200%", textAlign:'center'}}>
              {content.titre}
            </h1>

            <div style={{display:'flex', alignItems:'center', margin:10, padding:10}}>
            <img
              src={content.image}
              style={{ width: "40%", margin:5, position: "relative" }}
            />
            
            <p style={{padding:5}}>{content.texte}</p>

            </div>
          </Col>
          <Col span={7} className="gutter-row"
          style={{margin:5, padding:15, height:'100%', width:'30%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
           
            {alreadyVoted ?
            
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2 style={{color:"#37A4B2"}}>Résultat du Vote</h2>
              <Plot
              data={data}
              config={{displayModeBar:false}}
              layout={ {width:"380", height: 380, title:`Nbre total de Votants: ${nbVoters}`,
              paper_bgcolor:'#F2F3F4', legend: {orientation: 'h', side: 'top'},
              showticklabels: true, showlegend:false, margin:10
                  } }
              
              />
           
            </div>

            :
            <div style={{width:300, height:350, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
            <h2 style={{color:"#37A4B2"}}>VOTEZ</h2>
           {listVotes.map((vote, element) => {
             return(
               <Radio.Button key={element}
                disabled={status} style={{backgroundColor: `${vote.color}`, margin:10, fontWeight:'bold', border:`${vote.border}`}} value={vote.vote}
                onClick={(e) => {setSelection(e.target.value); handleBorder({element})}} shape='round'
              > {vote.vote}  </Radio.Button>
             )
           })}             

            <Button type="primary" size='large' disabled={status} onClick={() => voteValidation()}
            style={{marginTop:10}}>
              {boutonVali}
            </Button>
            {message}
        

          </div>

            }

          </Col>
          <Col
            span={7} className="gutter-row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems:'center',
              padding:5,
              margin: 5,
              width:'30%',
              height:'100%'
            }}
          >
            <div style={{display:'flex'}}>
          {alreadyVoted == true ?
            <div>
              <p style={{fontSize:20, fontStyle: 'italic', textAlign:'center'}}>
              Vous avez voté
              </p>
              <p style={{padding:10, fontWeight:'bold', fontStyle: 'normal', color:'orange', fontSize:30}}>{userVote}</p>
            </div>
            :
            ""
          }
          </div>          
          <div style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
              {alreadyCommented == true ?

                
                <div style={{padding:16, fontSize:20, fontStyle: 'italic', width:"100%", height:"100%", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                 <p> Vous avez commenté</p> 
                 <p style={{padding:20, fontStyle: 'normal', color:'blue', textAlign:'center'}}>{userComment}</p>
                <Button
                  htmlType="submit"
                  onClick="{onSubmit}"
                  type="danger"
                  shape="round"
                  size="small"
                  onClick={() => commentSuppr()}
                >Supprimer le commentaire
                </Button> 
                {messageCom}
                </div>
                
              :
          <div style={{width:"90%"}}>
            <h5 style={{color:"#37A4B2"}}>COMMENTEZ CETTE PUBLICATION</h5>
            {messageCom}
          <Form.Item>
            <TextArea
              rows={6}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tapez votre commentaire"
              value={comment}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick="{onSubmit}"
              type="primary"
              onClick={() => commentValidation()}
            >
              {boutonValiCom}
            </Button> 
          </Form.Item>
          
          </div>
           }
           </div>
          </Col>
      </Row>
      
      <Row style={{ margin:10, padding:10, width:"90vw",display: "flex", alignItem:'center' }}>
        <Col span={22} style={{color: "#37A4B2", fontSize: "150%"}}> 
        <h5 style={{color:"#37A4B2"}}>VOIR TOUS LES COMMENTAIRES PAR CATEGORIE DE VOTE</h5>
        <Tabs defaultActiveKey="1">
          {listVotes.map((vote, i) => {
            return(
            
          <TabPane tab={vote.vote} key={i}>
          <div>
              {connected == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                CONNECTEZ-VOUS POUR ACCEDER AUX COMMENTAIRES
                </p>                
              :

              <div>
                {alreadyVoted == false ?

                <p style={{padding:20, fontSize:20, fontWeight:'bold',color: "#37A4B2", fontSize: "150%", textAlign:'center', backgroundColor:"lightgray",width:"100%", height:"100%"}}>
                VOTEZ POUR ACCEDER AUX COMMENTAIRES
                </p>

                :

              <div>
                {commentairesList.map((comment, i) => { 
                  if(comment.vote == vote.vote) {
                    return(
                      <Commentaires vote={comment.vote} commentaire={comment.commentaire} nb_likes={comment.users_like.length} nb_dislikes={comment.users_dislike.length} id={comment._id} userId={user._id} alreadyLiked={comment.users_like.includes(user._id)} alreadyDisliked={comment.users_dislike.includes(user._id) }/>)
                       }
                    })}
            </div>
            }
            </div> 
              }
            </div>
          </TabPane>
          
            )
          })}
        </Tabs>
        </Col>
      </Row>
    
      </Content> 
      </Layout>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

function mapStateToProps(state) {
  return { token: state.token, publiToken: state.publiToken, commentairesList: state.commentairesList };
}

function mapDispatchToProps(dispatch) {
  return {
      addToken: function (token) {
          dispatch({ type: 'addToken', token: token },         
          )
  },addComment: function(newComment){
        dispatch({ type: 'addComment', newComment: newComment},         
          )
  }, updateNbLikes: function(commentairesList){
    dispatch({ type: 'updateLikes', listComments: commentairesList},         
      )
}
}
}

export default connect
(mapStateToProps,
  mapDispatchToProps
  )(Publication);
