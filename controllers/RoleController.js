require('dotenv').config

const Role = require('../models').Role;
const response = require('../helpers/responseFormatter')
const Validator = require("fastest-validator");
const v  = new Validator();


class RoleController {
    static async getAll(req,res) {
        try {
            let roles = await Role.findAll()
            return res.status(200).json(
                response('success','Berhasil get data',roles)
            )
        } catch (err) {
            return res.status(500).json(
                response('failed',err.message,'')
            )
        }
       
    }

    static async create(req,res) {
        try {

            const schema = {
                name : 'string|required',
                description : 'string|required'
            }
            const check = v.validate(req.body,schema)
            if(check.length) {
                return res.status(403).json(response('forbiden','failed',check))
            }
            const { name,description } = req.body

            const created = await Role.create({name,description})
            return res.status(200).json(response('success','berhasil insert',created))

        } catch (err) {
            return res.status(500).json(response('faileds',err.message,''))
        }
    }

    static async update(req,res) {
        try {
            const schema = {
                name : 'string|optional',
                description : 'string|optional'
            }
            const check = v.validate(req.body,schema)
            if(check.length) {
                return res.status(403).json(response('forbiden','failed',check))
            }
            const {id} = req.params
            const { name,description } = req.body
            await Role.update({
                name,
                description
            },{
                where : {
                    id : id
                }
            })
            const roles = await Role.findByPk(id)
            return res.status(200).json(response('success','berhasil update',roles))
        } catch (err) {
            return res.status(500).json(response('faileds',err.message,''))
        }
    }

    static async delete(req,res) {

        try {
            const{id} = req.params
            const del = await Role.destroy({
                where : {
                    id : id
                }
            })
            return res.status(200).json(response('success','berhasil dihapus',del))

        } catch (err) {
            return res.status(500).json(response('faileds',err.message,''))
        }

    }
}

module.exports = RoleController