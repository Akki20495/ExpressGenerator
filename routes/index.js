
var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'learning Express' , subtitle: 'Welcome to Node js course'});
});

router.get('/tutorials', (req, res, next)=> {
  console.log(req.query.course);
  res.render('index', { title: `learning Express1 ${req.query.course}`  , subtitle: 'Welcome to Node js course'});
});


module.exports = router;