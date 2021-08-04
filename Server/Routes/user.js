const express = require("express");
const router = express.Router();

const { login, register } = require("../Controllers/user");
const {
  loginValidation,
} = require("../Middleware/validateUser");

router.route("/login").post(loginValidation, login);

module.exports = router;
