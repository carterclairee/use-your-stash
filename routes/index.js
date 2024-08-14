var express = require('express');
var router = express.Router();
const db = require("..model/helper");

// Full url for the root is http://localhost:4000/api

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});

module.exports = router;
