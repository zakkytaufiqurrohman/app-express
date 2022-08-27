var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')
router
  .get('/test',UserController.test)

module.exports = router;
