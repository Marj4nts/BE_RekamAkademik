const tbl = require("..");

const rayon_relation = [
  {
    model: tbl.user_rayons,
    attributes: ["id", "user_id", "rayon_id"],
    as: "user_rayons",
    include: [
      {
        model: tbl.users,
        as: "user",
        attributes: ["id", "name", "nis", "email", "photo_profile"],
      },
    ],
  },
];

module.exports = rayon_relation;
