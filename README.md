[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
app.use(
  multer({
    allowedFile: function (req, file, cb) {
      if (
        !file.originalname.match(
          /\.(pdf|csv|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
        )
      ) {
        req.fileValidationError = "Only  files are allowed!";
        return cb(new Error("Only  files are allowed!"), false);
      }
      cb(null, true);
    },
    storage: multer.diskStorage({
      destination: "./uploads",
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  })
    // .single("img"))       // for upload 1 img
    .array("img", 12)
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
app.use(express.urlencoded({ extended: false }));

// Simple route
app.get("/", (req, res) => {
  res.json({});
});

// Call Routes
require("./routes/roles")(app);
require("./routes/auth")(app);
require("./routes/user")(app);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ git clone https://github.com/Yazz803/rekam_akademik_be.git
$ cd rekam_akademik_be
$ npm install
$ npx sequelize-cli init
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
$ node app.js / nodemon aps.js

Setelah menjalankan npx sequelize-cli init, kemungkinan ada warning message gitu, itu abaikan aja dulu, terus ubah file config.json pada folder config sesuai dengan konfigurasi database kamu
```

[appveyor-image]: https://badgen.net/appveyor/ci/dougwilson/express/master?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/express
[coveralls-image]: https://badgen.net/coveralls/c/github/expressjs/express/master
[coveralls-url]: https://coveralls.io/r/expressjs/express?branch=master
[github-actions-ci-image]: https://badgen.net/github/checks/expressjs/express/master?label=linux
[github-actions-ci-url]: https://github.com/expressjs/express/actions/workflows/ci.yml
[npm-downloads-image]: https://badgen.net/npm/dm/express
[npm-downloads-url]: https://npmcharts.com/compare/express?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/express
[npm-install-size-url]: https://packagephobia.com/result?p=express
[npm-url]: https://npmjs.org/package/express
[npm-version-image]: https://badgen.net/npm/v/express
