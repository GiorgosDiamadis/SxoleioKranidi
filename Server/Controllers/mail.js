const catchAsync = require("../Utils/catchAsync")
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport")
const {validationResult} = require("express-validator");

let auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}
let transporter = nodemailer.createTransport(mailgun(auth))

module.exports.sendEmail = catchAsync(async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    const {from, firstName, lastName, body} = req.body;
    let mailOptions = {
        from: from,
        to: "mail@1dim-kranid.arg.sch.gr",
        subject: `Μύνημα απο ${lastName} ${firstName}`,
        text: body
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(data)
        }
    })

})