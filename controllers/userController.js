const tbl = require("../models");
const Model = tbl.users;
const helpers = require("../helpers/commonHelpers");
const user_relation = require("../models/relationships/user_relation");
const excel = require("exceljs");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      include: user_relation,
    });

    data = data.map((item) => {
      return {
        id: item.id,
        nis: item.nis,
        name: item.name,
        email: item.email,
        photo_profile: item.photo_profile,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      };
    });

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil mengambil semua data users",
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
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      include: user_relation,
    });

    data = {
      id: data.id,
      nis: data.nis,
      name: data.name,
      email: data.email,
      photo_profile: data.photo_profile,
      role: data.user_role?.role?.name || null,
      kelas: data.user_grade?.grade?.name || null,
      rombel: data.user_rombel?.rombel?.name || null,
      rayon: data.user_rayon?.rayon?.name || null,
      jurusan: data.user_major?.major?.name || null,
    };

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil mengambil data user",
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

exports.getUsersForReport = async (req, res) => {
  try {
    let data = await Model.findAll({
      attributes: ["id", "nis", "name"],
      where: {
        "$user_role.role_id$": 4,
      },
      include: user_relation,
    });

    data = data.map((item) => {
      return {
        id: item.id,
        nis: item.nis,
        name: item.name,
      };
    });

    if (data) {
      return res.json({
        success: true,
        message: "Berhasil mengambil semua data users",
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

exports.createUser = async (req, res) => {
  let {
    nis,
    name,
    email,
    password,
    role_id,
    grade_id,
    rombel_id,
    rayon_id,
    major_id,
  } = req.body;

  let image = null;

  if (req.files) {
    image = req.files[0]?.filename;
  }

  try {
    // Set default role if not provided
    const defaultRoleId = 4; // Siswa
    let roleId = role_id || defaultRoleId;

    // Check if the email is already registered
    if (email) {
      const existingEmail = await Model.findOne({ where: { email } });
      if (existingEmail) {
        return res.json({
          success: false,
          message: "Email sudah terdaftar",
        });
      }
    }

    // Check if the NIS is already registered
    if (nis) {
      const existingNis = await Model.findOne({ where: { nis } });
      if (existingNis) {
        return res.json({
          success: false,
          message: "NIS sudah terdaftar",
        });
      }
    }

    const encryptedPassword = password || nis;
    const user = await Model.create({
      nis,
      name,
      email,
      password: helpers.encryptPassword(encryptedPassword),
      photo_profile: image,
    });

    let role, grade, rombel, rayon, major;

    if (roleId) {
      roleId = parseInt(roleId);
      role = await tbl.roles.findOne({
        attributes: ["name"],
        where: { id: roleId },
      });
      await tbl.user_roles.create({
        user_id: user.id,
        role_id,
      });
    }

    if (grade_id) {
      grade_id = parseInt(grade_id);
      grade = await tbl.grades.findOne({
        attributes: ["name"],
        where: { id: grade_id },
      });
      await tbl.user_grades.create({
        user_id: user.id,
        grade_id,
      });
    }

    if (rombel_id) {
      rombel_id = parseInt(rombel_id);
      rombel = await tbl.rombels.findOne({
        attributes: ["name"],
        where: { id: rombel_id },
      });
      await tbl.user_rombels.create({
        user_id: user.id,
        rombel_id,
      });
    }

    if (rayon_id) {
      rayon_id = parseInt(rayon_id);
      rayon = await tbl.rayons.findOne({
        attributes: ["name"],
        where: { id: rayon_id },
      });
      await tbl.user_rayons.create({
        user_id: user.id,
        rayon_id,
      });
    }

    if (major_id) {
      major_id = parseInt(major_id);
      major = await tbl.majors.findOne({
        attributes: ["name"],
        where: { id: major_id },
      });
      await tbl.user_majors.create({
        user_id: user.id,
        major_id,
      });
    }

    let dataUser = {
      id: user.id,
      nis: user.nis,
      name: user.name,
      email: user.email,
      photo_profile: user.photo_profile,
      role: role?.name || null,
      kelas: grade?.name || null,
      rombel: rombel?.name || null,
      rayon: rayon?.name || null,
      jurusan: major?.name || null,
    };

    return res.json({
      success: true,
      message: "Berhasil membuat user baru",
      data: dataUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    nis,
    name,
    email,
    password,
    photo_profile,
    role_id,
    grade_id,
    rombel_id,
    rayon_id,
    major_id,
  } = req.body;

  try {
    let user = await Model.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    user.nis = nis;
    user.name = name;
    user.email = email;
    user.photo_profile = photo_profile;

    if (password) {
      user.password = helpers.encryptPassword(password);
    }

    await user.save();

    // Update related data
    if (role_id) {
      await tbl.user_roles.update({ role_id }, { where: { user_id: user.id } });
    }

    // Update other related data as needed

    return res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    let user = await Model.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete related data
    await tbl.user_roles.destroy({ where: { user_id: user.id } });
    // Delete other related data as needed

    // Delete user
    await user.destroy();

    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

exports.exportAllUsersToExcel = async (req, res) => {
  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      include: user_relation,
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("All Users");

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = "All Users.xlsx";
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportAllUsersToExcelByRole = async (req, res) => {
  const { role_id } = req.query;

  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      where: {
        "$user_role.role_id$": role_id,
      },
      include: user_relation,
    });

    const role = await tbl.roles.findOne({
      attributes: ["name"],
      where: { id: role_id },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(`All Users - ${role.name}`);

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = `All Users - ${role.name}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportAllUsersToExcelByKelas = async (req, res) => {
  const { grade_id } = req.query;

  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      where: {
        "$user_grade.grade_id$": grade_id,
      },
      include: user_relation,
    });

    const grade = await tbl.grades.findOne({
      attributes: ["name"],
      where: { id: grade_id },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(`All Users - ${grade.name}`);

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = `All Users - ${grade.name}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportAllUsersToExcelByRombel = async (req, res) => {
  const { rombel_id } = req.query;

  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      where: {
        "$user_rombel.rombel_id$": rombel_id,
      },
      include: user_relation,
    });

    const rombel = await tbl.rombels.findOne({
      attributes: ["name"],
      where: { id: rombel_id },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(`All Users - ${rombel.name}`);

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = `All Users - ${rombel.name}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {}
};

exports.exportAllUsersToExcelByRayon = async (req, res) => {
  const { rayon_id } = req.query;

  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      where: {
        "$user_rayon.rayon_id$": rayon_id,
      },
      include: user_relation,
    });

    const rayon = await tbl.rayons.findOne({
      attributes: ["name"],
      where: { id: rayon_id },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(`All Users - ${rayon.name}`);

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = `All Users - ${rayon.name}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};

exports.exportAllUsersToExcelByJurusan = async (req, res) => {
  const { major_id } = req.query;

  try {
    const data = await Model.findAll({
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      where: {
        "$user_major.major_id$": major_id,
      },
      include: user_relation,
    });

    const jurusan = await tbl.majors.findOne({
      attributes: ["name"],
      where: { id: major_id },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(`All Users - ${jurusan.name}`);

    // Create header row
    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "NIS", key: "nis", width: 10 },
      { header: "Nama", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "Kelas", key: "kelas", width: 20 },
      { header: "Rombel", key: "rombel", width: 20 },
      { header: "Rayon", key: "rayon", width: 20 },
      { header: "Jurusan", key: "jurusan", width: 20 },
    ];

    // Add Array Rows
    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nis: item.nis || null,
        name: item.name,
        email: item.email,
        role: item.user_role?.role?.name || null,
        kelas: item.user_grade?.grade?.name || null,
        rombel: item.user_rombel?.rombel?.name || null,
        rayon: item.user_rayon?.rayon?.name || null,
        jurusan: item.user_major?.major?.name || null,
      });
    });

    // Set column alignment
    worksheet.columns.forEach((column) => {
      column.alignment = { horizontal: "center" };
    });

    // Set row height
    worksheet.getRow(1).height = 30;

    // Set font style
    worksheet.getRow(1).font = { bold: true };

    // Set number format
    worksheet.getColumn(1).numFmt = "0";

    // Freeze first row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    const fileName = `All Users - ${jurusan.name}.xlsx`;
    const filePath = path.join("/tmp/excel", fileName);

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

      // Hapus file setelah dikirim
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete the Excel file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to export data to Excel",
      error: error.message,
    });
  }
};
