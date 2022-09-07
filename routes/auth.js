var express = require('express')
var router = express.Router();

var authController = require('../controllers/Auth')

router
    .post('/register',authController.register)

module.exports = router