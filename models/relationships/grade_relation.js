const tbl = require("../../models");

const grade_relation = [
  {
    model: tbl.school_years,
    as: "school_year",
    attributes: ["id", "name"],
  },
];

module.exports = grade_relation;
