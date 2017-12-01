var express = require('express');
var router = express.Router();

let users = require('../models/user.js');
function handle4err(err,res){   
    res.json({
      code: 500,
      msg: err.message||"服务器出错"
    })    
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.json({
      code: 200,
      msg: "失败"
    })

});

//注册用户
router.post('/register',function(req, res, next){
    let {user, pwd, type} = req.body;
    users.find({user},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        } 
        if(doc.length>0){
            res.json({
              code: 210,
              msg: '该用户已注册,请选择其他名字...'
            })
            return
        } 
        users.create({user,pwd,type},(err,doc)=>{
            if(err){
              handle4err(err,res);
              return
            }    
            res.json({
              code:200,
              msg: '成功',
              result: doc
            })
        })
    })
    
})

//获取用户信息
router.get('/list', function(req, res, next){
    users.find({},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        }    
        res.json(doc)
    })
})
//删除所有用户信息
router.get('/remove', function(req, res, next){
    users.remove({},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        }    
        res.json(doc)
    })
})

module.exports = router;
