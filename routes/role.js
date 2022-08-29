var express = require('express')
var router = express.Router()

let RoleController = require('../controllers/RoleController')

router
    .get('/',RoleController.getAll)
    .post('/',RoleController.create)
    .put('/:id',RoleController.update)
    .delete('/:id',RoleController.delete)

module.exports = router