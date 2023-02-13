const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Models
const User = require("../models/User");

/**
 * Authenticate/ Login
 */
router.post(
  "/",
  body("email").not().isEmpty().withMessage("The email field is required"),
  body("email")
    .isEmail()
    .withMessage("The email must be a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("The passowrd field is required"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // sign a token with user data
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "mysecretkey",
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;

        return res.json({ token });
      }
    );
  }
);

module.exports = router;
