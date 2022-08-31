require('dotenv').config

const Permission = require('../models').Permission
const response = require('../helpers/responseFormatter')
const Validator = require("fastest-validator");
const v  = new Validator();

class PermissionController {
    static async getAll(req,res) {
        try {
            const data = await Permission.findAll();
            return res.status(200).json(response('success','Berhasil get data',data))
        } catch (err) {
            res.status(500).json(response('error',err.message,''))
        }
    }

    static async create(req,res) {
        try {
            const schema = {
                name : "string|required",
                description : "string|required"
            }
            const check  = v.validate(req.body,schema)
            if(check.length){
                return res.status(403).json(response('forbiden','failed',check))
            }

            const {name,description} = req.body

            const created = await Permission.create({name,description})
            return res.status(200).json(response('success','insert berhasil',created))
            

        } catch (err) {
            res.status(500).json(response('error',err.message,''))
        }
    }

    static async update(req,res) {
        try {
            const schema = {
                name : "string|optional",
                description : "string|optional"
            }

            const check = v.validate(req.body,schema)
            if(check.length){
                return res.status(403).json(response('forbiden','failed',check))
            }

            const {name,description} = req.body

            await Permission.update({
                name,
                description
            },{
                where : {
                    id : req.params.id
                }
            })

            const show = await Permission.findByPk(req.params.id)
            return res.status(200).json(response('success','berhasil update',show))
        } catch(err) {
            res.status(500).json(response('error',err.message,''))
        }
    }

    static async delete(req,res) {
        try {
            await Permission.destroy({
                where : {
                    id : req.params.id
                }
            })
            return res.status(200).json(response('success','berhasil dihapus',''))
        } catch (err) {
            res.status(500).json(response('error',err.message,''))
        }
    }
}
module.exports = PermissionController