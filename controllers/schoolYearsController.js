const tbl = require("../models");
const Model = tbl.school_years;
const school_year_relation = require("../models/relationships/school_year_relation");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "name"],
      include: school_year_relation,
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
      include: school_year_relation,
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
  let dataSchoolYears = { name: req.body.name };

  try {
    let data = await Model.create(dataSchoolYears);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah schoolYears",
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
  let dataSchoolYears = {
    name: req.body.name,
  };

  try {
    let [updated, data] = await Model.update(dataSchoolYears, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: "Berhasil mengubah schoolYears",
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
        message: "Berhasil menghapus schoolYears",
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
