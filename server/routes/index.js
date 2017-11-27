var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//测试nodemon是否能实时更新
router.get('/demo', function(req, res, next) {
  res.json({code:200, name:"测试"})
});
module.exports = router;
