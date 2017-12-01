var express = require('express');
var router = express.Router();
//用于post Form-data解析参数
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var demos = require('../models/demo.js');

//测试nodemon是否能实时更新
router.get('/list', function(req, res, next) {
  // res.json({code:200, name:"测试"})
  demos.find({}, function(err, doc){
    res.json(doc)
  })
});
router.get('/delete', function(req, res, next){
  demos.remove({}, function(err, doc){
    res.json(doc)
  })
})
router.get('/create', function(req, res, next){
  demos.create({
    "name": "harry",
    "age": Math.floor(Math.random()*10)+30
  },function(err, doc){
    res.json(doc)
  })
})
router.post('/postform', multipartMiddleware, function(req, res, next){
   res.json({data:req.body,cookies:req.cookies})
})
module.exports = router;
