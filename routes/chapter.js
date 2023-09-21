const checkToken = require("../helpers/checkToken");

module.exports = (app) => {
  const Controller = require("../controllers/chapterController");
  const router = require("express").Router();

  router.get("/", checkToken, Controller.getAll);
  router.get("/get", checkToken, Controller.getOne);
  router.post("/store", checkToken, Controller.store);
  router.post("/store-header", checkToken, Controller.storeHeader);
  router.post("/store-row", checkToken, Controller.storeRow);
  router.put("/update", checkToken, Controller.update);
  router.put("/update-header", checkToken, Controller.updateHeader);
  router.put("/update-row", checkToken, Controller.updateRow);
  router.delete("/destroy", checkToken, Controller.destroy);
  router.delete("/destroy-header", checkToken, Controller.destroyHeader);
  router.delete("/destroy-row", checkToken, Controller.destroyRow);

  app.use("/api/chapter", router);
};