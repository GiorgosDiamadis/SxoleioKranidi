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
        let connection = await db.getConnection();
        const result = await connection.query(`select *
                                               from users
                                               where username = '${username}'`);
        return result[0];
    }
    static async comparePassword(password, userPassword) {
        const isMatch = await bcrypt.compare(password, userPassword)
        return isMatch;
    }
    async save() {
        let salt = await bcrypt.genSalt(12);
        let hashed = await bcrypt.hash(this.password, salt);

        this.password = hashed;
        let connection = await db.getConnection();
        await connection.query(`insert into users(username, pass, email)
                                values ('${this.username}', '${this.password}', '${this.email}')`)
    }
}

module.exports = User;
