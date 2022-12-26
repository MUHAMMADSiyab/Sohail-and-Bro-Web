const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Users route");
});

module.exports = router;
