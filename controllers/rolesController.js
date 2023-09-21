const tbl = require("../models");
const Model = tbl.roles;

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll();

    if (data) {
      return res.json({
        success: true,
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

exports.getOne = async (req, res) => {
  let { id } = req.query;

  try {
    let data = await Model.findOne({
      where: { id },
    });
    if (data) {
      return res.json({
        success: true,
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

exports.store = async (req, res) => {
  let dataRoles = {
    name: req.body.name,
  };

  try {
    let data = await Model.create(dataRoles);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah roles",
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
  let dataRoles = {
    name: req.body.name,
  };

  try {
    let data = await Model.update(dataRoles, { where: { id } });

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil mengubah roles",
        data,
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
        message: "Berhasil menghapus roles",
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
