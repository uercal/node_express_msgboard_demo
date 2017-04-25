var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig');
var userSQL = require('../db/Sql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};


// 添加
router.get('/add', function(req, res, next){
  if(req.session.user!=null){
  // 从连接池获取连接 
  pool.getConnection(function(err, connection) { 
  // 获取前台页面传过来的参数  
  var param = req.query || req.params;
  // 建立连接 增加一个用户信息 
  connection.query(userSQL.insert, [param.username,param.content,param.head_pic], function(err, result) {
          if(result) {      
              result = {   
                        code: 200,   
                      msg:'增加成功'
              };  
          }     

      // 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);   

      // 释放连接  
        connection.release();  

        });
      });
  }else{
    result={
      code:404,
      msg:'你未登录'
    }
    responseJSON(res, result);   
  }
 });





  
// 添加
router.get('/del', function(req, res, next){
  if(req.session.user!=null){
  // 从连接池获取连接 
  pool.getConnection(function(err, connection) { 
  // 获取前台页面传过来的参数  
  var param = req.query || req.params;
  // 建立连接 增加一个用户信息 
  connection.query(userSQL.delete, [param.id], function(err, result) {
          if(result) {      
              result = {   
                        code: 200,   
                      msg:'删除成功'
              };  
          }     

      // 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);   

      // 释放连接  
        connection.release();  

        });
      });
  }else{
    result={
      code:404,
      msg:'你未登录'
    }
    responseJSON(res, result);   
  }
 });




/* GET home page. */
router.get('/', function(req, res, next) {
   var session = req.session.user;
   if(session != null){
    pool.getConnection(function(err, connection) {
      connection.query(userSQL.get, [], function(err, result) {
        if(result){
            
            //res.send(result);
            res.render('main/index',{keys:result});
        }            
      })
    })    
   }else{
      //res.send('null');
      res.redirect('/comment');
   }
});

router.get('/name',function(req,res,next){
  res.send(req.param('key'));
  
});

router.get('/logout',function(req,res,next){
    req.session.user = null;
    res.redirect('/');
})



module.exports = router;
