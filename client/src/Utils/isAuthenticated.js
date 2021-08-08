const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = () => {
    let initState = {user: null};

    const auth = localStorage.getItem("auth");

    if (auth) {
        const token = auth.split(" ")[1];
        let decodedUser = null;
        try {
            decodedUser = jwt.verify(token, config.JWT_SECRET);
            if (decodedUser.exp * 1000 < Date.now()) {
                localStorage.removeItem("auth");
            } else {
                initState.user = decodedUser;
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem("auth");
        }
    }

    return initState;
}