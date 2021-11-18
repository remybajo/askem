var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments');
const mongoose = require('mongoose');

router.get("/commentarticle", async function(req, res, next){

    //Récupération des publications ou j'ai commenté
   var publication = [];
  var user = await userModel.findOne({token : req.query.token})
  if (user){
  var article = await commentModel.find
  ({user_id : user._id}).populate('publication_id')
  
  for (let i=0; i < article.length; i++){
   publication.push(article[i].publication_id)}}
  
      //Récupération des publications ou j'ai voté
  var publicationVote = [];
   if (user){
   var articleVote = await voteModel.find
   ({user_id : user._id}).populate('publication_id')
   
   for (let i=0; i < articleVote.length; i++){
    publicationVote.push(articleVote[i].publication_id)}}
   
  
    // Récupération des publications que j'ai créé
    if (user){
      var myArticles = await publicationModel.find({user_id : user._id})
    }

  
  res.json({publication, publicationVote, myArticles})
   })

module.exports = router;