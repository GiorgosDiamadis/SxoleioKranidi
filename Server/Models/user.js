const db = require("../db")
const bcrypt = require("bcryptjs");


class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static async findOne(data) {
        const {username} = data;
        return new Promise(function (resolve, reject) {
                db.query(
                    `select *
                     from users
                     where username = '${username}'`,
                    function (err, res) {
                        if (res === undefined) {
                            reject(new Error("Error rows is undefined"));
                        } else {
                            resolve(res[0]);
                        }
                    }
                )
            }
        )
    }

    static async comparePassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }

    async save() {
        let salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        return new Promise(function (resolve, reject) {
                db.query(
                    `insert into users(username, pass, email)
                     values ('${this.username}', '${this.password}', '${this.email}')`,
                    function (err, res) {
                        if (res === undefined) {
                            reject(new Error("Error rows is undefined"));
                        } else {
                            resolve(res[0]);
                        }
                    }
                )
            }
        )
    }
}

module.exports = User;
