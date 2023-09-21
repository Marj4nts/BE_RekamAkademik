const tbl = require("../../models");

const major_relation = [
  {
    model: tbl.rombels,
    as: "rombels",
    attributes: ["id", "name", "token"],
  },
  {
    model: tbl.grades,
    as: "grade",
    attributes: ["id", "name"],
  },
];

module.exports = major_relation;
