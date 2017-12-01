var express = require('express');
var router = express.Router();
//用于post Form-data解析参数
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//mongoose
var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://user:!QAZ2wsx@127.0.0.1:27017/job',{useMongoClient:true});
//监听是否链接成功
mongoose.connection.on('connected', function (){
    console.log('MongoDB connected success.')
})
mongoose.connection.on('error', function (){
    console.log('MongoDB connected fail.')
})
mongoose.connection.on('disconnected', function (){
    console.log('MongoDB connected disconnected.')
})
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
