const { checkSchema } = require("express-validator");
module.exports.saveValidation = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Το όνομα είναι κενό!",
    },
  },
  teacher_id: {
    in: ["body"],
    isInt: true,
  },
  specialty: {
    in: ["body"],
    isLength: {
      errorMessage: "Η ειδικότητα είναι κενή!",
      options: { min: 1 },
    },
  },
  gender: {
    in: ["body"],
    isLength: {
      errorMessage: "Επιλέξτε φύλο",
      options: { min: 1 },
    },
  },
});
