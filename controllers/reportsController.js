const tbl = require("../models");
const Model = tbl.reports;
const report_relation = require("../models/relationships/report_relation");
const rayon_relation = require("../models/relationships/rayon_relation");
const multer = require("multer");
const excel = require("exceljs");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      order: [["id", "desc"]],
      attributes: ["id", "name", "image", "desc", "createdAt"],
      include: report_relation,
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
      attributes: ["id", "name", "image", "desc"],
      include: report_relation,
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

exports.getByRayon = async (req, res) => {
  let { id } = req.query;

  try {
    // Checking user
    const user = await tbl.user_rayons.findAll({
      where: { rayon_id: id },
      attributes: ["user_id"],
    });

    if (user.length === 0) {
      return res.json({
        success: false,
        message: "Siswa tidak ditemukan",
      });
    }

    const siswaIds = user.map((userRayon) => userRayon.user_id);

    const data = await Model.findAll({
      where: { student_id: siswaIds },
      attributes: ["id", "name", "image", "desc", "createdAt"],
      include: report_relation,
    });

    if (data.length > 0) {
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
  let dataReports = {
    student_id: req.body.student_id,
    name: req.body.name,
    image: req.files[0].filename,
    desc: req.body.desc,
  };

  try {
    let data = await Model.create(dataReports);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah reports",
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

exports.storeByTeacher = async (req, res) => {
  let dataReports = {
    student_id: req.body.student_id,
    user_id: req.body.user_id,
    name: req.body.name,
    image: req.files[0].filename,
    desc: req.body.desc,
  };

  try {
    let data = await Model.create(dataReports);

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah reports",
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
  let dataReports = {
    student_id: req.body.student_id,
    user_id: req.body.user_id,
    name: req.body.name,
    image: req.files[0].filename,
    desc: req.body.desc,
  };

  try {
    let [updated, data] = await Model.update(dataReports, {
      where: { id },
      returning: true,
    });

    if (updated) {
      return res.json({
        success: true,
        message: "Berhasil mengubah reports",
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
        message: "Berhasil menghapus reports",
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

exports.exportAllDataToExcel = async (req, res) => {
  try {
    const data = await Model.findAll({
      attributes: ["name", "desc", "createdAt"],
      include: report_relation,
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Data Reports");

    // Menambahkan header ke file Excel
    worksheet.addRow(["Pelapor", "Description", "Tanggal dan waktu", "Siswa"]);

    // Menambahkan data ke file Excel
    data.forEach((report) => {
      const name = (report.pelapor ? report.pelapor.name : "") || report.name;
      worksheet.addRow([
        name,
        report.desc,
        report.createdAt,
        report.siswa.name,
      ]);
    });

    const fileName = "all_reports.xlsx";
    const filePath = path.join("/tmp/excel", fileName); // Path untuk menyimpan file

    // Membuat direktori jika tidak ada
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    // Mengirimkan file Excel sebagai respons
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to export data to Excel",
          error: err.message,
        });
      }

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportTodayDataToExcel = async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];

    const data = await Model.findAll({
      attributes: ["name", "desc", "createdAt"],
      include: report_relation,
      where: {
        createdAt: {
          [Op.gte]: todayDate, // Ambil data yang dibuat pada hari ini atau setelahnya
        },
      },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Data Reports");

    // Menambahkan header ke file Excel
    worksheet.addRow(["Pelapor", "Description", "Tanggal dan waktu", "Siswa"]);

    // Menambahkan data ke file Excel
    data.forEach((report) => {
      const name = (report.pelapor ? report.pelapor.name : "") || report.name;
      worksheet.addRow([
        name,
        report.desc,
        report.createdAt,
        report.siswa.name,
      ]);
    });

    const fileName = "today_reports.xlsx";
    const filePath = path.join("/tmp/excel", fileName); // Path untuk menyimpan file

    // Membuat direktori jika tidak ada
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    // Mengirimkan file Excel sebagai respons
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to export data to Excel",
          error: err.message,
        });
      }

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportAllDataToExcelByRayon = async (req, res) => {
  const { id } = req.query; // Assuming you pass the Rayon ID as a query parameter

  try {
    const user = await tbl.user_rayons.findAll({
      where: { rayon_id: id },
      attributes: ["user_id"],
    });

    if (user.length === 0) {
      return res.json({
        success: false,
        message: "Siswa tidak ditemukan",
      });
    }

    const siswaIds = user.map((userRayon) => userRayon.user_id);

    const data = await Model.findAll({
      attributes: ["name", "desc", "createdAt"],
      include: report_relation,
      where: {
        student_id: siswaIds,
      },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Data Reports by Rayon");

    worksheet.addRow(["Pelapor", "Description", "Tanggal dan waktu", "Siswa"]);

    data.forEach((report) => {
      const name = (report.pelapor ? report.pelapor.name : "") || report.name;
      worksheet.addRow([
        name,
        report.desc,
        report.createdAt,
        report.siswa.name,
      ]);
    });

    const fileName = `reports_by_rayon_${id}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName); // Path to save the file

    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to export data to Excel",
          error: err.message,
        });
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportTodayDataToExcelByRayon = async (req, res) => {
  const { id } = req.query; // Assuming you pass the Rayon ID as a query parameter

  try {
    const user = await tbl.user_rayons.findAll({
      where: { rayon_id: id },
      attributes: ["user_id"],
    });

    if (user.length === 0) {
      return res.json({
        success: false,
        message: "Siswa tidak ditemukan",
      });
    }

    const siswaIds = user.map((userRayon) => userRayon.user_id);

    const todayDate = new Date().toISOString().split("T")[0];

    const data = await Model.findAll({
      attributes: ["name", "desc", "createdAt"],
      include: report_relation,
      where: {
        student_id: siswaIds,
        createdAt: {
          [Op.gte]: todayDate, // Filter data created today or after
        },
      },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Today's Data Reports by Rayon");

    worksheet.addRow(["Pelapor", "Description", "Tanggal dan waktu", "Siswa"]);

    data.forEach((report) => {
      const name = (report.pelapor ? report.pelapor.name : "") || report.name;
      worksheet.addRow([
        name,
        report.desc,
        report.createdAt,
        report.siswa.name,
      ]);
    });

    const fileName = `today_reports_by_rayon_${id}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName); // Path to save the file

    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to export data to Excel",
          error: err.message,
        });
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};
