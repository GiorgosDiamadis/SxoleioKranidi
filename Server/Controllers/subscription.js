const catchAsync = require("../Utils/catchAsync")
const Subscription = require("../Models/subscription");

module.exports.addSubscription = catchAsync(async (req, res, next) => {
    const {email} = req.body;
    console.log("sdfhjk")
    if (!email) {
        res.status(400).send({msg: "Το email είναι κενό!"});
        return;
    }

    const subs = new Subscription(email);
    const result = await subs.save();


    res.status(200).send(result)
})