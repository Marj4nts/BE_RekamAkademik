const tbl = require("../models");
const Model = tbl.rayons;
const rayon_relation = require("../models/relationships/rayon_relation");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "name"],
      // include: rayon_relation,
    });

    // data = data.map((item) => {
    //   return {
    //     id: item.id,
    //     name: item.name,
    //     users: item.user_rayons.map((item) => {
    //       return {
    //         id: item.user.id,
    //         name: item.user.name,
    //         nis: item.user.nis,
    //         email: item.user.email,
    //         photo_profile: item.user.photo_profile,
    //       };
    //     }),
    //   };
    // });

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
      // include: rayon_relation,
    });

    // data = {
    //   id: data.id,
    //   name: data.name,
    //   users: data.user_rayons.map((item) => {
    //     return {
    //       id: item.user.id,
    //       name: item.user.name,
    //       nis: item.user.nis,
    //       email: item.user.email,
    //       photo_profile: item.user.photo_profile,
    //     };
    //   }),
    // };

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
  let dataRayons = { name: req.body.name };

  try {
    let data = await Model.create(dataRayons);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah rayons",
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
  let dataRayons = {
    name: req.body.name,
  };

  try {
    let [updated, data] = await Model.update(dataRayons, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: "Berhasil mengubah rayons",
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
        message: "Berhasil menghapus rayons",
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
