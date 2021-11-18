var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments')

router.post('/sendComment', async function(req, res, next){
    var result = false
    var user = await userModel.findOne({token: req.body.token})
  
    // if(user != null){
      var newComment = new commentModel({
        user_id: user._id,
        publication_id: req.body.publication,
        vote: req.body.vote,
        commentaire: req.body.commentaire,
        users_like: [],
        users_dislike: [],
        date: req.body.date
    })
  
      var commentSave = await newComment.save()
      console.log("check commentSave: ",commentSave)
  
      if(commentSave.vote){
        result = true
      }
    // }
  
    res.json(result)
  })

  var id;
  router.get('/showComments', async function(req, res, next){
    id = req.query.id;
    var result = false;
    var comments = await commentModel.find({publication_id: id});
    //console.log("selected comment: ", comments)
  
    if(comments){
        result = true
        //console.log("comments result: ",result)
      }

    res.json({result, comments})
})

router.post('/updateLikes', async function(req, res, next){
  var commentLiked = await commentModel.findById(req.body.commentId);
  console.log("check like: ", req.body.like);
  console.log("check dislike: ", req.body.dislike);

  var checkDoublonLikes = commentLiked.users_like.findIndex(e => e == req.body.userId)
  var checkDoublonDislikes = commentLiked.users_dislike.findIndex(e => e == req.body.userId)
  
  if(req.body.like == 1 && checkDoublonLikes == -1) {
  await commentLiked.users_like.push(req.body.userId);
  await commentLiked.save();
  } else if (req.body.like == 0){
    await commentLiked.users_like.pull(req.body.userId);
    await commentLiked.save();
  }

  if(req.body.dislike == 1 && checkDoublonDislikes == -1) {
    await commentLiked.users_dislike.push(req.body.userId)
    await commentLiked.save()
  } else if (req.body.dislike == 0) {
    await commentLiked.users_dislike.pull(req.body.userId);
    await commentLiked.save();
  }
  
  console.log("comment liked after push: ", commentLiked)

  res.json(commentLiked)
})

module.exports = router;