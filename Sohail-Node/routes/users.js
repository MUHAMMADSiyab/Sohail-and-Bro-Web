const express = require("express");
const mysql = require("mysql");
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
const upload = multer({ storage });

router.post("/upload_photo", upload.single("photo"), (req, res, next) => {
  return res.json({ data: req.file });
});

module.exports = router;
