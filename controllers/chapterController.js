const tbl = require("../models");
const Chapter = tbl.chapters;
const ChapterHeader = tbl.chapter_headers;
const ChapterRow = tbl.chapter_rows;
const chapter_relation = require("../models/relationships/chapter_relation");

exports.getAll = async (req, res) => {
  try {
    let data = await Chapter.findAll({
      order: [["id", "desc"]],
      attributes: ["id", "name"],
      include: chapter_relation,
    });

    if (data.length) {
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
    let data = await Chapter.findOne({
      where: { id },
      attributes: ["id", "name"],
      include: chapter_relation,
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
  let { name } = req.body;

  try {
    let data = await Chapter.create({
      name,
    });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil ditambahkan",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal ditambahkan",
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

exports.storeHeader = async (req, res) => {
  let { chapter_id, name } = req.body;

  try {
    let data = await ChapterHeader.create({
      chapter_id,
      name,
    });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil ditambahkan",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal ditambahkan",
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

exports.storeRow = async (req, res) => {
  let { chapter_header_id, desc, input_type } = req.body;

  try {
    let data = await ChapterRow.create({
      chapter_header_id,
      desc,
      input_type,
    });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil ditambahkan",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal ditambahkan",
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
  let { id, name } = req.body;

  try {
    let data = await Chapter.update(
      {
        name,
      },
      { where: { id } }
    );
    if (data > 0) {
      return res.json({
        success: true,
        message: "Data berhasil diubah",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal diubah",
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

exports.updateHeader = async (req, res) => {
  let { id, chapter_id, name } = req.body;

  try {
    let data = await ChapterHeader.update(
      {
        chapter_id,
        name,
      },
      { where: { id } }
    );
    if (data > 0) {
      return res.json({
        success: true,
        message: "Data berhasil diubah",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal diubah",
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

exports.updateRow = async (req, res) => {
  let { id, chapter_header_id, desc, input_type } = req.body;

  try {
    let data = await ChapterRow.update(
      {
        chapter_header_id,
        desc,
        input_type,
      },
      { where: { id } }
    );
    if (data > 0) {
      return res.json({
        success: true,
        message: "Data berhasil diubah",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal diubah",
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
  let { id } = req.body;

  try {
    let data = await Chapter.destroy({ where: { id } });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil dihapus",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal dihapus",
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

exports.destroyHeader = async (req, res) => {
  let { id } = req.body;

  try {
    let data = await ChapterHeader.destroy({ where: { id } });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil dihapus",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal dihapus",
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

exports.destroyRow = async (req, res) => {
  let { id } = req.body;

  try {
    let data = await ChapterRow.destroy({ where: { id } });
    if (data) {
      return res.json({
        success: true,
        message: "Data berhasil dihapus",
        data: data,
      });
    } else {
      return res.json({
        success: false,
        message: "Data gagal dihapus",
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
