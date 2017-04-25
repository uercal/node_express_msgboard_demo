var express = require('express');
var router = express.Router();

// 
var crypto = require('crypto'),
    User = require('../models/user.js');







/* 登录 */
router.get('/',function(req,res,next){
    res.render('comments/index',{title:'登录',success: req.flash('success').toString()});
});

router.post('/',function(req,res,next){
    var name = req.body.username;
    var password = req.body.password;
    var md5 = md5.createHash(password).digest('hex');
    var user = new User({
        name:name,
        password:password
    });
    User.get(user.name,function(err,user){
        if(user.password==password){
            req.session.user=user;
            req.flash('name',user.name);
            res.redirect('/');
        }else{
            req.flash('success','error');
            res.redirect('/comments');
        }
    });


});

/* 注册 */ 
router.get('/reg',function(req,res){
    res.render('comments/reg',{title:'注册',error:req.flash('error').toString()});
});


router.post('/reg', function (req, res) {
  var name = req.body.username,
      password = req.body.password;

  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
      name: name,
      password: password
  });
  //检查用户名是否已经存在 
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/comment/reg');
    }
    if (user) {
      req.flash('error', '用户已存在!');
      return res.redirect('/comment/reg');//返回注册页
    }
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('comment/reg');//注册失败返回主册页
      }
      //req.session.user = newUser;//用户信息存入 session
      req.flash('success', 'ok');
      res.redirect('/comment');//注册成功后返回登录页
    });
  });
});




module.exports = router;