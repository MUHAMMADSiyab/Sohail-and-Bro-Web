const express = require("express");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");

const router = express.Router();

router.get("/", (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password",
    database: "nsms",
  });

  db.connect();

  db.query(
    "SELECT id, name, email FROM users LIMIT 50",
    (err, users, fields) => {
      if (err) throw err;

      return res.render("users", { users });
    }
  );

  db.end();
});

router.get("/upload", (req, res) => {
  return res.render("upload");
});

/**
 * Upload routes
 */

const storage = multer.diskStorage({
  destination: __dirname + "/../uploads",
  filename: function (req, file, cb) {
    const originalname = file.originalname.split(".")[0];
    const extension = file.originalname.split(".")[1];
    const fileName = `${originalname}_${Date.now()}.${extension}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 100000 },
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname); // .jpg .png
    const allowList = [".jpg", ".png", ".jpeg", ".gif"];

    if (!allowList.includes(extension)) {
      cb(new Error("Only image files are allowerd"));
    } else {
      cb(null, true);
    }
  },
});

const uploadHandler = upload.single("photo");

router.post("/upload_photo", (req, res) => {
  uploadHandler(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(422).json({ msg: "File size is too large" });
      } else if (!err.code) {
        return res.status(422).json({ msg: "Only image files are allowed" });
      }
    }

    return res.json({ success: "Uploaded" });
  });
});

module.exports = router;
