require('dotenv').config()
const response = require('../helpers/responseFormatter')
const Validator = require("fastest-validator");
const v  = new Validator();
const User = require("../models").user

class UserController {
    static async test(req,res) {
        return res.send('haloo');
    }

    static async register(req,res) {
        try {
            const schema = {
                name: "string",
                email: "email",
                password :"min:6",
                role_id :"required"
            }
            const check = v.validate(req.body,schema);
            if(check.length){
                return res.status(403).json(response('forbiden','failed',check))
            }
            const {name,email,password,phone_number} = req.body
            const created = await User.create({
                name,
                email,
                phone_number,
                password,
                role_id : 1
            });
            return res.status(200).json(response('success','berhasil insert',created))

        } catch (err) {
            return res.status(500).json(response('faileds',err.message,''))
        }
    }
}

module.exports = UserController