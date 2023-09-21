const tbl = require("../../models");

const report_relation = [
  {
    model: tbl.users,
    as: "siswa",
    attributes: ["id", "name", "nis", "email", "photo_profile"],
  },
  {
    model: tbl.users,
    as: "pelapor",
    attributes: ["id", "name", "nis", "email", "photo_profile"],
  },
];

module.exports = report_relation;
