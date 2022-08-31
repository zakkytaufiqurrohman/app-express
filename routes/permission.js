var express = require('express')
var router = express.Router()

let permissionController = require('../controllers/PermissionController')

router
    .get('/',permissionController.getAll)
    .post('/',permissionController.create)
    .put('/:id',permissionController.update)
    .delete('/:id',permissionController.delete)

module.exports = router