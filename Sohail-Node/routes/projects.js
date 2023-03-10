const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const { collection } = require("../mongo_client");

router.get("/", async (req, res) => {
  const projects = await collection("projects").find().toArray();

  return res.json({ data: projects });
});

router.get("/test", async (req, res) => {
  const projects = await collection("projects")
    // .find({ budget: { $nin: [1500, 3500, 650], $lt: 2000 } })
    // .find({ $or: [{ budget: { $lt: 2000 } }, { budget: { $eq: 3500 } }] })
    // .find({ developers: { $exists: true } })
    .find({
      // name: { $regex: /^c/, $options: "i" },
      // name: { $regex: /M$/, $options: "i" },
      // name: { $regex: /g System/, $options: "im" },
      // name: { $in: [/^t/i, /m$/i] },
      name: { $regex: /^[a-zA-Z ]+$/i },
    })
    // .explain();
    .toArray();

  return res.json({ data: projects });
});

router.get("/sort", async (req, res) => {
  // const projects = await collection("projects")
  //   .aggregate([
  //     { $match: { name: /Sc/ } },
  //     { $group: { _id: null, totalBudget: { $avg: "$budget" } } },
  //   ])
  //   .toArray();

  const projects = await collection("projects").distinct("budget");
  // .find()
  // .sort({ budget: -1 })
  // .toArray();

  return res.json({ projects });
});

router.get("/:id", async (req, res) => {
  project = await collection("projects").findOne({
    _id: ObjectId(req.params.id),
  });

  if (!project) return res.status(404).json({ msg: "Not Found" });

  return res.json(project);
});

router.post(
  "/",
  body("name")
    .not()
    .isEmpty()
    .withMessage("The project name field is required"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Save new project
    await collection("projects").insertOne(req.body);

    return res.status(200).json({ msg: "Project Created" });
  }
);

router.put("/:id", async (req, res) => {
  await collection("projects").updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: req.body,
    }
  );

  return res.json({ msg: "Project Updated" });
});

router.delete("/:id", async (req, res) => {
  await collection("projects").deleteOne({ _id: ObjectId(req.params.id) });

  return res.json({ msg: "Project Deleted" });
});

module.exports = router;
