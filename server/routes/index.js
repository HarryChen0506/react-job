var express = require('express');
var router = express.Router();
//用于post Form-data解析参数
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//mongoose
var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://user:!QAZ2wsx@127.0.0.1:27017/demo',{useMongoClient:true});
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
var Users = require('../models/demo.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//测试nodemon是否能实时更新
router.get('/demo', function(req, res, next) {
  // res.json({code:200, name:"测试"})
  Users.find({}, function(err, doc){
    res.json(doc)
  })
});
router.get('/delete', function(req, res, next){
  Users.remove({}, function(err, doc){
    res.json(doc)
  })
})
router.get('/create', function(req, res, next){
  Users.create({
    "name": "harry",
    "age": 28,
    "num": Math.floor(Math.random()*10)
  },function(err, doc){
    res.json(doc)
  })
})
router.post('/postform', multipartMiddleware, function(req, res, next){
   res.json(req.body)
})
module.exports = router;
