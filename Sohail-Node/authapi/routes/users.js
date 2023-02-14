const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Middleware
const auth = require("../middleware/auth");

/**
 * Create / Register a user
 */
router.post(
  "/",
  body("name").not().isEmpty().withMessage("The name field is required"),
  body("email").not().isEmpty().withMessage("The email field is required"),
  body("email")
    .isEmail()
    .withMessage("The email must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password length must be 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }

    const newUser = new User(req.body);

    // Hashing the password
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    return res.json(newUser);
  }
);

module.exports = router;
