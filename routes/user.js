const checkToken = require("../helpers/checkToken");
const multer = require("multer");

module.exports = (app) => {
  const Controller = require("../controllers/userController.js");
  const router = require("express").Router();

  router.get("/export-all-user", Controller.exportAllUsersToExcel);
  router.get(
    "/export-all-user-by-role",
    Controller.exportAllUsersToExcelByRole
  );
  router.get(
    "/export-all-user-by-kelas",
    Controller.exportAllUsersToExcelByKelas
  );
  router.get(
    "/export-all-user-by-rombel",
    Controller.exportAllUsersToExcelByRombel
  );
  router.get(
    "/export-all-user-by-rayon",
    Controller.exportAllUsersToExcelByRayon
  );
  router.get(
    "/export-all-user-by-jurusan",
    Controller.exportAllUsersToExcelByJurusan
  );

  router.get("/", checkToken, Controller.getAll);
  router.get("/get-one", checkToken, Controller.getOne);
  router.get("/get-users-for-report", Controller.getUsersForReport);
  router.post("/create", Controller.createUser);
  router.put("/update/:id", Controller.updateUser); // Update user
  router.delete("/delete/:id", Controller.deleteUser); // Delete user

  app.use("/api/user", router);
};
