const catchAsync = require("../Utils/catchAsync")
const Subscription = require("../Models/subscription");
const {validationResult} = require("express-validator")
const {validateSubscription} = require("../Middleware/ValidateSubscription")

module.exports.addSubscription = catchAsync(async (req, res, next) => {
    next();
})