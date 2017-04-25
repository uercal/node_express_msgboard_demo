var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('主页');
});

router.get('/name',function(req,res,next){
  res.send(req.param('key'));
  
});




module.exports = router;
