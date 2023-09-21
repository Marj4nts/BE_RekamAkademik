const tbl = require("../../models");

const school_year_relation = [
  { model: tbl.grades, as: "grades", attributes: ["id", "name"] },
];

module.exports = school_year_relation;
