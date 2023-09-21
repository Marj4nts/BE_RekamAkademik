const tbl = require("../models");
const Model = tbl.rombels;

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      attributes: ["id", "name", "token"],
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
      attributes: ["id", "name", "token"],
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
  let dataRombels = {
    major_id: req.body.major_id,
    name: req.body.name,
    token: req.body.token,
  };

  try {
    let data = await Model.create(dataRombels);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah rombels",
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
  let dataRombels = {
    major_id: req.body.major_id,
    name: req.body.name,
    token: req.body.token,
  };

  try {
    let [updated, data] = await Model.update(dataRombels, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: "Berhasil mengubah rombels",
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
    let deleted = await Model.destroy({
      where: {
        id: id,
      },
    });
    if (deleted) {
      return res.json({
        success: true,
        message: "Berhasil menghapus rombels",
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
