const tbl = require("..");

const user_relation = [
  {
    model: tbl.user_roles,
    as: "user_role",
    attributes: ["role_id"],
    include: [
      {
        model: tbl.roles,
        as: "role",
        attributes: ["name"],
      },
    ],
  },
  {
    model: tbl.user_grades,
    as: "user_grade",
    attributes: ["grade_id"],
    include: [
      {
        model: tbl.grades,
        as: "grade",
        attributes: ["name"],
      },
    ],
  },
  {
    model: tbl.user_rombels,
    as: "user_rombel",
    attributes: ["rombel_id"],
    include: [
      {
        model: tbl.rombels,
        as: "rombel",
        attributes: ["name"],
      },
    ],
  },
  {
    model: tbl.user_rayons,
    as: "user_rayon",
    attributes: ["rayon_id"],
    include: [
      {
        model: tbl.rayons,
        as: "rayon",
        attributes: ["name"],
      },
    ],
  },
  {
    model: tbl.user_majors,
    as: "user_major",
    attributes: ["major_id"],
    include: [
      {
        model: tbl.majors,
        as: "major",
        attributes: ["name"],
      },
    ],
  },
];

module.exports = user_relation;
