var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var voteModel = require('../models/votes')

router.post('/sendVote', async function(req, res, next){
    var result = false
    var user = await userModel.findOne({token: req.body.token})

    console.log("check publication id: ", req.body.publication)
    console.log("check user id: ", user._id)
  
    if(user != null){
      var newVote = new voteModel({
        user_id: user._id,
        publication_id: req.body.publication,
        vote: req.body.vote,
        date_vote: req.body.date
      })
  
      var voteSave = await newVote.save()
      console.log("check vote",voteSave)
  
      if(voteSave.vote){
        result = true
      }
     }

    res.json(result)
  })


module.exports = router;