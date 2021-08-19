const catchAsync = require("../Utils/catchAsync");
const generateToken = require("../Utils/generateToken");
const User = require("../Models/user");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports.login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;
    let error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }
    const user = await User.findOne({username});
    console.log(user)

    if (user === null || user === undefined) {
        error.errors.push({msg: "To όνομα χρήστη ή ο κωδικός πρόσβασης είναι λάθος!"});
        res.status(401).send(error);
        return;
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.pass)

    if (isPasswordCorrect === false) {
        error.errors.push({msg: "To όνομα χρήστη ή ο κωδικός πρόσβασης είναι λάθος!"});
        res.status(401).send(error);
        return;
    }


    const token = generateToken(user._id, user.username, user.email);

    res.header("authorization", `Bearer ${token}`);

    res.status(200).send({
        user: {username: user.username, email: user.email, user_id: user._id},
    });
});
