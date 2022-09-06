var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')
router
  .post('/',UserController.register)

module.exports = router;
