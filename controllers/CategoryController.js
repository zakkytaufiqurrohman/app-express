require("dotenv").config;

const Category = require("../models").Category;
const response = require("../helpers/responseFormatter");
const Validator = require("fastest-validator");
const v = new Validator();

class CategoryController {
  static async getAll(req, res) {
    try {
      let category = await Category.findAll();
      return res
        .status(200)
        .json(response("success", "Berhasil get data", category));
    } catch (err) {
      return res.status(500).json(response("failed", err.message, ""));
    }
  }

  static async create(req, res) {
    try {
      const schema = {
        name: "string|required",
      };
      const check = v.validate(req.body, schema);
      if (check.length) {
        return res.status(403).json(response("forbiden", "failed", check));
      }
      const { name } = req.body;

      const created = await Category.create({ name });
      return res
        .status(200)
        .json(response("success", "berhasil insert", created));
    } catch (err) {
      return res.status(500).json(response("faileds", err.message, ""));
    }
  }

  static async update(req, res) {
    try {
      const schema = {
        name: "string|optional",
      };
      const check = v.validate(req.body, schema);
      if (check.length) {
        return res.status(403).json(response("forbiden", "failed", check));
      }
      const { id } = req.params;
      const { name } = req.body;
      await Category.update(
        {
          name,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const categories = await Category.findByPk(id);
      return res
        .status(200)
        .json(response("success", "berhasil update", categories));
    } catch (err) {
      return res.status(500).json(response("faileds", err.message, ""));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const del = await Category.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json(response("success", "berhasil dihapus", del));
    } catch (err) {
      return res.status(500).json(response("faileds", err.message, ""));
    }
  }
}

module.exports = CategoryController;
