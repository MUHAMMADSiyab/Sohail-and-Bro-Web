const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Projects route");
});

router.get("/:id", (req, res) => {
  return res.status(404).json({ msg: "Not Found" });

  return res.send(`Individual Project ${req.params.id}`);
});

router.post("/", (req, res) => {
  return res.status(200).json(req.body);
});

module.exports = router;
