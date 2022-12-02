var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grocery Store' });
});


/* GET /about */
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About this Site',
    content: 'Details of your items'
  })
})


module.exports = router;
