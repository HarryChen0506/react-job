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

//测试es6 async await
router.get('/es6', function(req, res, next){
    //测试es6
    var sleep = function (time, index) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 模拟出错了，返回 ‘error’   
                if(index!==3){
                     resolve('hello'+index);     
                }else{
                    reject('错误')
                }          
                                    
            }, time);
        })
    };
    async function start () {
        for (var i = 1; i <= 5; i++) {
            console.log(`当前是第${i}次等待..`); 
            try{
                const value = await sleep(1000, i); 
                console.log('value',value);
            } catch (error) {
                console.log(error);
            }            
            console.log('执行不？')
        }
    };
    start();
    console.log('继续')
})

module.exports = router;
