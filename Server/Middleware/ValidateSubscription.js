const {checkSchema} = require("express-validator")

module.exports.validateSubscription = checkSchema({
    email: {
        in: ["body"],
        isLength: {
            errorMessage: "Το email είναι κενό!",
            options: { min: 1 },
        },
    }
});