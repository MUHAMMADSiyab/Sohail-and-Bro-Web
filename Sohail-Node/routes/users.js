const express = require("express");
const mysql = require("mysql");

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

module.exports = router;
