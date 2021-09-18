const db = require("../db");

class Subscription {
    constructor(email) {
        this.email = email;
    }

    static async getAll() {
        let conn = await db.getConnection();
        return new Promise(function (resolve, reject) {
            conn
                .query(`SELECT * FROM subscriptions`)
                .then((data) => {
                    conn.release();
                    resolve(data);
                })
                .catch(() => {
                    conn.release();
                    reject();
                });
        });
    }
    async save() {
        var that = this;
        let conn = await db.getConnection();
        return new Promise(function (resolve, reject) {
            conn
                .query(
                    `insert into subscriptions(email)
                 values ('${that.email}')`
                )
                .then((data) => {
                    conn.release();
                    resolve(data.insertId);
                })
                .catch((reason) => {
                    console.log(reason);
                    conn.release();
                    reject();
                });
        });
    }
}

module.exports = Subscription;
