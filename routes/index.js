var express = require('express');
var router = express.Router();

var uid2 = require('uid2');
var bcrypt = require('bcrypt');
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var commentModel = require('../models/comments');
var voteModel = require('../models/votes') ;
const { PromiseProvider } = require('mongoose');


//gestion du sign-in
router.post('/sign-up', async function (req, res, next) {

  var error = []

  var result = false
  var saveUser = null
 

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.passwordFromFront !== req.body.passwordVerifFromFront) {
    error.push('Les mots de passes ne correspondent pas')
  }

  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }


  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
  
    })

    saveUser = await newUser.save()


    if (saveUser) {
      result = true
     
    }
  }


  res.json({ result, saveUser, error})
})

router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []

  var token = null

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,

    })


    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }

    } else {
      error.push('email incorrect')
    }
  }
 


  res.json({ result, user, error, token })


})





// mise à jour du profil
router.post('/addProfil', async function(req, res, next){
  var result = false;
  
var userUpdate = [
  await userModel.updateOne({token : req.body.token}, {gender : req.body.genderFromFront}),
  await userModel.updateOne({token : req.body.token}, {dateOfBirth : req.body.dateOfBirth}),
  await userModel.updateOne({token : req.body.token}, {CSP : req.body.csp}),
  await userModel.updateOne({token : req.body.token}, {civilState : req.body.civilState}),
  await userModel.updateOne({token : req.body.token}, {numberOfcChild: req.body.child})
  
]
  if (userUpdate) {
    result = true
  }
 res.json({result, userUpdate})
 })




//récupérer les publications par thème
router.get('/publicationdb', async function(req, res, next){
  var result = false;
  var theme = req.query.theme
  var publicationTheme = await publicationModel.find({thematique : theme})

if (publicationTheme){
  result = true;
}
  res.json({publicationTheme, result})
  
 })

// pour retrouver une publication commentée dans le profil
router.get("/commentarticle", async function(req, res, next){

  //Récupération des publications ou j'ai commenté
  var result = false;
 var publication = [];
var user = await userModel.findOne({token : req.query.token})
if (user){
var article = await commentModel.find
({user_id : user._id}).sort({date: -1}).populate('publication_id')
for (let i=0; i < article.length; i++){
 publication.push(article[i].publication_id)}}
 if (article){
   var result=true;
 }

 //Récupération des publications ou j'ai voté
var publicationVote = [];
 if (user){
 var articleVote = await voteModel.find
 ({user_id : user._id}).sort({date_vote: -1}).populate('publication_id')

 
 for (let i=0; i < articleVote.length; i++){
  publicationVote.push(articleVote[i].publication_id)}}
 

  if (articleVote){
    var result=true;
  }
// Récupération des publications que j'ai créé
  if (user){
   
    var myArticles = await publicationModel.find({user_id : user._id}).sort({date_publication: -1})
  }

  if (myArticles){
    var result = true;
  }
    

res.json({publication, publicationVote, myArticles, result})
 })



  

// pour bar de recherche
 router.get('/searchPublication', async function(req, res, next){
   var result = false;
   var allPublications = await publicationModel.find()
   if (allPublications){
     var result = true
   }
   res.json({allPublications, result})
  })



// pour récupérer les infos des publication
router.get('/allVotes', async function(req, res, next){
  var result = false;
    var allVotes = await voteModel.find()
if (allVotes){
  var result = false
}
    res.json({allVotes})
   })


//mail de validation
 router.get('/validation', async function(req, res, next){
   var resul = false;
  var token = null
  var userUpdate = [
  await userModel.updateOne({email : req.query.email}, {token: uid2(32)})
  ]

if (userUpdate){
  var result = true;
}


 
   res.json({ userUpdate, token, result})
  })
 



module.exports = router;