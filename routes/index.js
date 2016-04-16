var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// get base calendar page
router.get('/a_year', function(req, res, next) {
  res.render('a_year', { title: 'Calendar' });
});
// get all the cities
router.get('/all_cities', function(req, res, next) {
  res.render('all_cities', { title: 'Locations' });
});
// get characters
router.get('/characters', function(req, res, next) {
  res.render('characters', { title: 'Characters' });
});
// get on the map page
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'World Map' });
});



module.exports = router;
