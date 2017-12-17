var express = require('express');
var router = express.Router();

let users = require('../models/user.js');
let chats = require('../models/chat.js');

function handle4err(err,res){   
    res.json({
      code: 500,
      msg: err.message||"服务器出错"
    })    
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    //获取cookie
    let { userId } = req.cookies;
    users.findOne({_id:userId},(err, doc)=>{
        if(err){
            handle4err(err,res);
            return
        }
        if(doc){
            res.json({
              code:200,
              msg: '用户id正确',
              result: doc
            })
        }else{
            res.json({
              code:210,
              msg: '无该用户id'
            })
        }
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
              msg: '该用户名已被注册,请选择其他名字...'
            })
            return
        } 

        let usersModel = new users({user, pwd, type});
        usersModel.save((err, doc)=>{
             if(err){
              handle4err(err,res);
              return
            } 
            if(!doc){
                res.json({
                    code:210,
                    msg: '注册失败'
                })
            }   
            res.cookie('userId', doc._id,{httpOnly: true })
            doc.pwd='';
            res.json({
              code:200,
              msg: '成功',
              result: doc
            })
        })

        // users.create({user,pwd,type},(err,doc)=>{
        //     if(err){
        //       handle4err(err,res);
        //       return
        //     }    
        //     res.json({
        //       code:200,
        //       msg: '成功',
        //       result: doc
        //     })
        // })
    })
    
})
//登录
router.post('/login', function(req, res, next){
    let {user, pwd} = req.body;       
    users.findOne({user,pwd},{pwd: 0},(err, doc)=>{
        if(err){
            handle4err(err,res);
            return
        }   
        if(!doc){
            res.json({
              code: 210,
              msg: '用户名或密码不正确!'
            })
        }else{
            res.cookie('userId',doc._id,{httpOnly: true })
            res.json({
                code: 200,
                result:doc,
                msg: '成功'
            })
        }
    })
})
//注销
router.get('/logout',function(req, res, next){
    res.cookie('userId', '', {expires: new Date(0)});
    res.json({
        code: 200,
        msg: '注销成功'
    })
})
//更新信息
// db.user.update({userName:"jack"},{$set:{userAge:128}})
router.post('/update', function(req, res, next){
    let userId = req.cookies.userId;
    let {avatar,company,desc,salary,title} = req.body;
    if(!userId){
        return res.json({
              code: 210,
              msg: 'userId的cookie不正确'
            })
    }
    users.findOne({_id:userId},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        } 
        if(!doc){
            res.json({
                code:210,
                msg: '用户id不正确'
            })
        }  
        let {user, type} = doc;
        let resultData = Object.assign({},{avatar,company,desc,salary,title},{user, type});
        users.update({_id:userId},{$set:{avatar,company,desc,salary,title}},(err, doc)=>{
            if(err){
                handle4err(err,res);
                return
            } 
            if(!doc){
                res.json({
                    code:210,
                    msg: '更新失败'
                })
            }   
            res.json({
                code:200,
                msg: '成功',
                result: resultData
            })
        }) 
    })
      
})
//读取消息
router.post('/readmsg',function(req, res, next){
    let userId = req.cookies.userId;
    let {from} = req.body;
    if(!userId){
        return res.json({
              code: 210,
              msg: 'userId的cookie不正确'
            })
    }
    chats.update({from,to:userId},{$set:{readed: true}},{multi: true},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        } 
        if(!doc){
            res.json({
                code:210,
                msg: '更新已读消息失败'
            })
        }   
        // console.log(doc)
        res.json({
            code:200,
            msg: '更新已读消息成功',
            readedNum: doc.nModified
        })
    })

})

//获取用户列表
router.get('/list', function(req, res, next){
    const { type }= req.query;
    let param = {};
    if(type!==undefined && type!==null){
        param = {type}
    } 
    users.find(param,(err,doc)=>{
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

//获取聊天信息
router.get('/chatlist', function(req, res, next){
    const userId = req.cookies.userId;
    // let param = {};
    // if(type!==undefined && type!==null){
    //     param = {type}
    // } 
    users.find({},(err,userDoc)=>{
        if(err){
            handle4err(err,res);
            return
        }  
        let userList = {};
        Array.forEach(userDoc,(val, index)=>{
            userList[val._id] = {
                name: val.user,
                avatar: val.avatar
            }
        })
        chats.find({'$or':[{'from':userId},{'to': userId}]},(err,doc)=>{
            if(err){
                handle4err(err,res);
                return
            }  
            if(!doc){
                res.json({
                    code:210,
                    msg: '获取聊天列表失败'
                })
            }
            res.json({
                code:200,
                msg: '成功',
                result: doc,
                users: userList
            })
        })
    })
    
})

    // chats.remove({},(err,doc)=>{      
    //     if(err){
    //         handle4err(err,res);
    //         return
    //     }
    // })

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
