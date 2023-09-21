const checkToken = require("../helpers/checkToken");

module.exports = (app) => {
  const Controller = require("../controllers/authController.js");
  const router = require("express").Router();

  router.post("/register", checkToken, Controller.register);
  router.post("/login", Controller.login);
  router.patch("/setting-password", checkToken, Controller.settingPassword);

  app.use("/api/auth", router);
};
