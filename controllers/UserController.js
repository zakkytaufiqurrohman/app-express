require('dotenv').config()
const response = require('../helpers/responseFormatter')
const Validator = require("fastest-validator");
const v  = new Validator();
const User = require("../models").user

class UserController {
    static async test(req,res) {
        return res.send('haloo');
    }
}

module.exports = UserController