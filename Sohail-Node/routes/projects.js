const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../db");

router.get("/", async (req, res) => {
  const projectsCollection = db.getCollection("projects");

  const projects = await projectsCollection.find().toArray();

  return res.json({ data: projects });
});

router.get("/:id", (req, res) => {
  return res.status(404).json({ msg: "Not Found" });

  return res.send(`Individual Project ${req.params.id}`);
});

router.post(
  "/",
  body("name")
    .not()
    .isEmpty()
    .withMessage("The project name field is required"),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(200).json(req.body);
  }
);

module.exports = router;
