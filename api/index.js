require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
app.use(
  multer({
    allowedFile: function (req, file, cb) {
      if (
        !file.originalname.match(
          /\.(pdf|csv|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
        )
      ) {
        req.fileValidationError = "Only files are allowed!";
        return cb(new Error("Only files are allowed!"), false);
      }
      cb(null, true);
    },
    storage: multer.diskStorage({
      destination: "/tmp/uploads",
      filename: function (req, file, cb) {
        let fileName = file.originalname
          .split(".")[0]
          .replace(/\s/g, "-")
          .toLowerCase();
        cb(
          null,
          fileName + Date.now().toString() + path.extname(file.originalname)
        );
      },
    }),
  }).array("image", 12)
); // for upload more than 1 img

// mengizinkan atau membatasi akses dari domain berbeda
// let corsOptions = {
//   origin: "http://localhost:8081",
//   optionsSuccessStatus: 200,
// };
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use("/api/img/", express.static("/tmp/uploads"));
// Simple route
app.get("/", (req, res) => {
  res.json({});
});

// Call Routes
require("../routes/roles")(app);
require("../routes/auth")(app);
require("../routes/user")(app);
require("../routes/rombels")(app);
require("../routes/rayons")(app);
require("../routes/majors")(app);
require("../routes/grades")(app);
require("../routes/school_years")(app);
require("../routes/reports")(app);
require("../routes/chapter")(app);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
