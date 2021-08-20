const db = require("../db");
const bcrypt = require("bcryptjs");

class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static async findOne(data) {
        const {username} = data;
        let conn = await db.getConnection();
        return new Promise(function (resolve, reject) {
            conn.query(
                `select *
                 from users
                 where username = '${username}'`,
            ).then((data) => {
                conn.release()
                resolve(data[0])
            }).catch(() => {
                conn.release()
                reject();
            });
        });
    }

    static async comparePassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }

    async save() {
        let salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        let conn = await db.getConnection()

        return new Promise(function (resolve, reject) {
            conn.query(
                `insert into users(username, pass, email)
                 values ('${this.username}', '${this.password}', '${this.email}')`,
                function (err, res) {
                    if (res === undefined) {
                        conn.release()
                        reject(new Error("Error rows is undefined"));
                    } else {
                        conn.release()
                        resolve(res[0]);
                    }
                }
            );
        });
    }
}

module.exports = User;
