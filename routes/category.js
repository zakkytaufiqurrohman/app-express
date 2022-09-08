var express = require("express");
var router = express.Router();

let CategoryController = require("../controllers/CategoryController");

router
  .get("/", CategoryController.getAll)
  .post("/", CategoryController.create)
  .put("/:id", CategoryController.update)
  .delete("/:id", CategoryController.delete);

module.exports = router;
