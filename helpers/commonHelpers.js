"use strict";
const crypto = require("crypto");

class CommonHelpers {
  static encryptPassword(password) {
    let key = "userPasswordKey";
    let hash = crypto.createHmac("sha512", key);
    return hash.update(password.toString()).digest("hex");
  }

  static encryptUserId(id) {
    let key = process.env.USER_ID_KEY || "userIdKey";
    let hash = crypto.createHmac("sha512", key);
    return hash.update(id.toString()).digest("hex");
  }
}

module.exports = CommonHelpers;
