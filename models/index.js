"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const mysql2 = require("mysql2");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialectModule: mysql2,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialectModule: mysql2,
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.roles = require("./roles.js")(sequelize, Sequelize);
db.grades = require("./grades.js")(sequelize, Sequelize);
db.majors = require("./majors.js")(sequelize, Sequelize);
db.rayons = require("./rayons.js")(sequelize, Sequelize);
db.rombels = require("./rombels.js")(sequelize, Sequelize);
db.user_roles = require("./user_roles.js")(sequelize, Sequelize);
db.user_notes = require("./user_notes.js")(sequelize, Sequelize);
db.user_grades = require("./user_grades.js")(sequelize, Sequelize);
db.user_majors = require("./user_majors.js")(sequelize, Sequelize);
db.user_rayons = require("./user_rayons.js")(sequelize, Sequelize);
db.user_rombels = require("./user_rombels.js")(sequelize, Sequelize);
db.chapters = require("./chapters.js")(sequelize, Sequelize);
db.chapter_headers = require("./chapter_headers.js")(sequelize, Sequelize);
db.chapter_rows = require("./chapter_rows.js")(sequelize, Sequelize);
db.school_years = require("./school_years.js")(sequelize, Sequelize);
db.reports = require("./reports.js")(sequelize, Sequelize);

db.users.hasOne(db.user_roles, {
  as: "user_role",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.user_roles.hasOne(db.roles, {
  as: "role",
  sourceKey: "role_id",
  foreignKey: "id",
});

db.users.hasMany(db.user_notes, {
  as: "user_notes",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.users.hasOne(db.user_grades, {
  as: "user_grade",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.user_grades.hasOne(db.grades, {
  as: "grade",
  sourceKey: "grade_id",
  foreignKey: "id",
});

db.users.hasOne(db.user_rombels, {
  as: "user_rombel",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.user_rombels.hasOne(db.rombels, {
  as: "rombel",
  sourceKey: "rombel_id",
  foreignKey: "id",
});

db.users.hasOne(db.user_rayons, {
  as: "user_rayon",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.user_rayons.hasOne(db.rayons, {
  as: "rayon",
  sourceKey: "rayon_id",
  foreignKey: "id",
});

db.rayons.hasMany(db.user_rayons, {
  as: "user_rayons",
  sourceKey: "id",
  foreignKey: "rayon_id",
});

db.user_rayons.hasOne(db.users, {
  as: "user",
  sourceKey: "user_id",
  foreignKey: "id",
});

db.users.hasOne(db.user_majors, {
  as: "user_major",
  sourceKey: "id",
  foreignKey: "user_id",
});

db.user_majors.hasOne(db.majors, {
  as: "major",
  sourceKey: "major_id",
  foreignKey: "id",
});

db.school_years.hasMany(db.grades, {
  as: "grades",
  sourceKey: "id",
  foreignKey: "school_year_id",
});

db.grades.hasOne(db.school_years, {
  as: "school_year",
  sourceKey: "school_year_id",
  foreignKey: "id",
});

db.grades.hasMany(db.majors, {
  as: "majors",
  sourceKey: "id",
  foreignKey: "grade_id",
});

db.majors.hasMany(db.rombels, {
  as: "rombels",
  sourceKey: "id",
  foreignKey: "major_id",
});

db.majors.hasOne(db.grades, {
  as: "grade",
  sourceKey: "grade_id",
  foreignKey: "id",
});

db.reports.hasOne(db.users, {
  as: "siswa",
  sourceKey: "student_id",
  foreignKey: "id",
});

db.reports.hasOne(db.users, {
  as: "pelapor",
  sourceKey: "user_id",
  foreignKey: "id",
});

db.chapters.hasMany(db.chapter_headers, {
  as: "chapter_header",
  sourceKey: "id",
  foreignKey: "chapter_id",
});

db.chapter_headers.hasMany(db.chapter_rows, {
  as: "chapter_rows",
  sourceKey: "id",
  foreignKey: "chapter_header_id",
});

module.exports = db;