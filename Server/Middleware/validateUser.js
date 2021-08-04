const catchAsync = require("../Utils/catchAsync");
const { body, checkSchema } = require("express-validator");
const User = require("../Models/user");

module.exports.loginValidation = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "To όνομα χρήστη είναι κενό!",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: "Ο κωδικός πρέπει να είναι μεταξύ 6 και 60 χαρακτήρες!",
      options: { min: 6, max: 60 },
    },
  },
});
