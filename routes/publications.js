var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments');
const mongoose = require('mongoose');


var id;
var token;

router.get('/lastPublications', async function(req, res, next){
    var result = false;
    var publications = await publicationModel.find().sort({date_publication: -1});
    var latest = publications.slice(0,3)
   
    if(latest.length == 3){
        result = true
      }

    res.json({result, latest})

})

router.get('/populaires', async function(req, res, next){
  var result = false;
  var rank = await voteModel.aggregate([ 
    {$group:{
      _id : "$publication_id",
       voteCount: { $sum: 1 }
      }},
    {$sort:{ voteCount: -1 }},
    {$limit: 3 }
    ]);

  console.log("see rank: ", rank)

  var topPublications = [];
  for (var i=0; i<rank.length; i++) {
    var publi = await publicationModel.find({_id: rank[i]});
    // retourne un tableau de tableaux
    topPublications.push(publi[0]);
  }

  //console.log("check public: ", topPublications)
   
  res.json({result, topPublications})

})

router.get('/allPublications', async function(req, res, next){
  var result = false;
  var allPublications = await publicationModel.find().sort({date_publication: -1});
 
  if(allPublications){
      result = true
      
    }

    
  res.json({result, allPublications})

})


router.get('/selectedPublication', async function(req, res, next){
  var id;
  console.log("req.query ",req.query)
  
  var result = false;
  var result_comments = false
  id = req.query.id;
  //console.log("check id: ",id)

  // récupération de l'article correspondant à l'id sélectionné
  var publication = await publicationModel.findById(id);
  var publiToDisplay = publication
  if(publiToDisplay){
    result = true
  };

  // récupération des commentaires sur la publication sélectionnée
var comments = await commentModel.find({publication_id: id})

  if(comments){
  result_comments = true;
    //console.log("result_comments: ", result_comments)
};
  //console.log("publication selected: ",publiToDisplay)

   

  // checker si le user est connecté et récupérer ses infos
  var user;
  var votes
  var userConnected = false;
 
// verifie si l'utilisateur est connecté
  if (req.query.token != null) {
    userConnected = true;
    user = await userModel.findOne({token: req.query.token});
  }
  
  // récup data votes
  votes = await voteModel.find({publication_id: id});
  
  //on récupère les données sur les gens qui ont voté. Et on récupère si la personne connecté fait aprtie des votants
  var voters = await voteModel.find({publication_id: id}).populate('user_id');
  
//stats
  var gender = [{genre: "hommes", nbre:0}, {genre: "femmes", nbre:0}]
  for(var i=0;i<voters.length;i++){
    if(voters[i].user_id.gender == 'homme'){
      gender[0].nbre++
    } else {
      gender[1].nbre++
    }
  }

  //Stats
  var nbVoters = voters.length
  
 
 

  // récupération du résultat du vote pour l'article sélectionné. On aggrege le nombre de vote par vote.

  var stats = await voteModel.aggregate([ 
    {$match:{publication_id: mongoose.Types.ObjectId(id)}},
    {$group:{
    _id : "$vote",
     userCount: { $sum: 1 }
   }}
  ]);
  


  res.json({result, publiToDisplay, comments, stats, userConnected, user, votes, gender, nbVoters})

})

router.delete('/deleteComment', async function(req, res, next){
  id = req.query.id;
  token = req.query.token;
  var user = await userModel.findOne({token:token})

  // suppression du (ou des) commentaires. Il n'y aura qu'un seul commentaire par la suite.
 
  await commentModel.deleteOne({publication_id: id, user_id:user._id });
  
  
  res.json();
})



//Poster une publication

router.post('/post-publication', async function(req, res, next){
  var error = []
  var result = false
  var savePublication
  var user = await userModel.findOne({token: req.body.token})
  
  var idd = user.id




  if(req.body.titrePublication == ''
  || req.body.contenuPublication == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
    var newPublication = new publicationModel({
      thematique: req.body.themePublication,
      titre: req.body.titrePublication,
      texte: req.body.contenuPublication,
      image: req.body.image,
      date_publication: req.body.datePublication,
      statut: false,
      motsCle: req.body.motClePublication,
      user_id: idd,
    })
  
    savePublication = await newPublication.save()
 
var id = ''    
    
    if(savePublication){
      result = true
      id = savePublication.id
    }
  }


    res.json({result, id})
  })

module.exports = router;