const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const users = [
    { id: 1, name: "Mr John" },
    { id: 2, name: "Sara Smith" },
    { id: 3, name: "Kim" },
    { id: 4, name: "Brad" },
  ];
  return res.render("users", { users });
});

module.exports = router;
