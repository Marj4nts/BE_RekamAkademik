const tbl = require("../models");
const Model = tbl.majors;
const major_relation = require("../models/relationships/major_relation");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      order: [["id", "desc"]],
      attributes: ["id", "name"],
      include: major_relation,
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
      include: major_relation,
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
  let dataMajors = { grade_id: req.body.grade_id, name: req.body.name };

  try {
    let grade = await tbl.grades.findOne({
      where: { id: req.body.grade_id },
    });

    let findData = await Model.findOne({
      where: { name: req.body.name, grade_id: req.body.grade_id },
    });

    if (findData) {
      return res.json({
        success: false,
        message: `Jurusan ${req.body.name} ${grade.name} sudah ada`,
      });
    }

    let data = await Model.create(dataMajors);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah majors",
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
  let dataMajors = {
    grade_id: req.body.grade_id,
    name: req.body.name,
  };

  try {
    let oldData = await Model.findOne({
      where: { id },
    });

    let [updated, data] = await Model.update(dataMajors, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: `Berhasil Mengubah Jurusan ${oldData.name} menjadi ${data[0].name}`,
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
        message: "Berhasil menghapus Jurusan",
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
