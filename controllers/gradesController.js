const tbl = require("../models");
const Model = tbl.grades;
const grade_relation = require("../models/relationships/grade_relation");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "name"],
      include: grade_relation,
    });

    if (data) {
      return res.json({
        success: true,
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  let { id } = req.query;

  try {
    let data = await Model.findOne({
      where: { id },
      attributes: ["id", "name"],
      include: grade_relation,
    });
    if (data) {
      return res.json({
        success: true,
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.store = async (req, res) => {
  let dataGrades = {
    school_year_id: req.body.school_year_id,
    name: req.body.name,
  };

  try {
    let data = await Model.create(dataGrades);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah grades",
        data: data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  let id = req.body.id;
  let dataGrades = {
    school_year_id: req.body.school_year_id,
    name: req.body.name,
  };

  try {
    let [updated, data] = await Model.update(dataGrades, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: "Berhasil mengubah grades",
        data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  let { id } = req.query;

  try {
    let data = await Model.destroy({
      where: {
        id: id,
      },
    });
    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menghapus grades",
      });
    } else {
      return res.json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};
