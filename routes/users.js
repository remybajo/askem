var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  var result = false
  var user = await userModel.findOne({token: req.body.token})
  res.json(result, user)
});

module.exports = router;
