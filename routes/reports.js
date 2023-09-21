const checkToken = require("../helpers/checkToken");

module.exports = (app) => {
  const Controller = require("../controllers/reportsController.js");
  const router = require("express").Router();

  router.get("/export-all-data", Controller.exportAllDataToExcel);
  router.get("/export-data-today", Controller.exportTodayDataToExcel);
  router.get("/export-all-data-by-rayon", Controller.exportAllDataToExcelByRayon);
  router.get("/export-data-today-by-rayon", Controller.exportTodayDataToExcelByRayon);

  router.get("/", checkToken, Controller.getAll);
  router.get("/get", checkToken, Controller.getOne);
  router.get("/get-by-rayon", checkToken, Controller.getByRayon);
  router.post("/store", Controller.store);
  router.post("/store-teacher", checkToken, Controller.storeByTeacher);
  router.put("/update", checkToken, Controller.update);
  router.delete("/destroy", checkToken, Controller.destroy);

  app.use("/api/reports", router);
};
