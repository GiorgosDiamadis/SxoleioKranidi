const db = require("../db")
const bcrypt = require("bcryptjs");
const {log} = require("nodemon/lib/utils");


class Post {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    static getAll(amount) {
        return new Promise(function (resolve, reject) {
                db.query(
                    `SELECT *
                     FROM posts ${amount !== undefined ? `LIMIT ${amount}` : ""}`,
                    function (err, rows) {
                        if (rows === undefined) {
                            reject(new Error("Error rows is undefined"));
                        } else {
                            resolve(rows);
                        }
                    }
                )
            }
        )
    }

    static update(title, body, post_id) {
        console.log("sdf")
        return new Promise(function (resolve, reject) {
            db.query(`update posts
                      set title='${title}',
                          body='${body}'
                      where post_id = ${post_id}`, function (err, res) {
                if (err) {
                    console.log(err)
                }
                if (res === undefined)
                    reject()
                else
                    resolve(res)
            })
        })
    }


    static delete(post_id) {
        return new Promise(function (resolve, reject) {
                db.query(
                    `delete
                     from posts
                     where post_id = ${post_id}`,
                    function (err, res) {
                        if (res === undefined) {
                            reject();
                        } else {
                            resolve(res);
                        }
                    }
                )
            }
        )
    }

    getTitle(){
        return this.title;
    }

    getBody(){
        return this.body;
    }

    save() {
        this.publishedAt = Date.now().toString();
        var that = this;
        return new Promise(function (resolve, reject) {
                db.query(
                    `insert into posts(title, body, publishedAt)
                     values ('${that.title}', '${that.body}', '${that.publishedAt}')`,
                    function (err, res) {
                        if (res === undefined) {
                            reject();
                        } else {
                            resolve(res.insertId);
                        }
                    }
                )
            }
        )
    }
}

module.exports = Post;
