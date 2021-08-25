const {checkSchema} = require("express-validator")

module.exports.validateEmail = checkSchema({
    from: {
        in: ["body"],
        isString: true,
        isLength: {
            options: { min: 1 },
            errorMessage: "Το email είναι κενό!",
        },
    },
    body: {
        in: ["body"],
        isLength: {
            errorMessage: "Το περιεχόμενο είναι κενό!",
            options: { min: 1 },
        },
    },
    firstName: {
        in: ["body"],
        isLength: {
            errorMessage: "Το όνομα είναι κενό!",
            options: { min: 1 },
        },
    },
    lastName: {
        in: ["body"],
        isLength: {
            errorMessage: "Το επίθετο είναι κενό!",
            options: { min: 1 },
        },
    }
});