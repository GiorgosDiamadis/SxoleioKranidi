const { checkSchema } = require("express-validator");
module.exports.saveValidation = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Ο τίτλος είναι κενός!",
    },
  },
  body: {
    in: ["body"],
    isLength: {
      errorMessage: "Το περιεχόμενο είναι κενό!",
      options: { min: 1 },
    },
  },
  summary: {
    in: ["body"],
    isLength: {
      errorMessage: "Η περίληψη είναι κενή!",
      options: { min: 1 },
    },
  },
});
