"use strict";

require("dotenv").config();
const accessTokenSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const tbl = require("../models");
const user_relation = require("../models/relationships/user_relation");
const User = tbl.users;

module.exports = async (req, res, next) => {
  const token = req.get("api-token") || req.query["api-token"];
  let key = req.query["key"];

  try {
    if (!token) throw "Required Token";

    let user = {};
    let jwtData = jwt.verify(token, accessTokenSecret);
    if (!jwtData) throw "Invalid Token";
    user = await User.findOne({
      where: {
        email: jwtData.email,
      },
      attributes: ["id", "nis", "name", "email", "photo_profile"],
      include: user_relation,
    });

    user = {
      id: user.id,
      nis: user.nis,
      name: user.name,
      email: user.email,
      photo_profile: user.photo_profile,
      role: user.user_role?.role?.name || null,
      kelas: user.user_grade?.grade?.name || null,
      rombel: user.user_rombel?.rombel?.name || null,
      rayon: user.user_rayon?.rayon?.name || null,
      jurusan: user.user_major?.major?.name || null,
    };

    req.user = user;
  } catch (error) {
    let errMsg = error.message || error;
    let httpCode = error.httpCode || 401;

    return res.status(httpCode).json({
      success: false,
      message: errMsg,
    });
  }

  return next();
};
