const db = require("../db")
const bcrypt = require("bcryptjs");
const {log} = require("nodemon/lib/utils");


class Post {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    static getAll() {
        return new Promise(function (resolve, reject) {
                db.query(
                    "SELECT * FROM posts",
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
                if (err){
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

    save() {
        this.publishedAt = Date.now().toString();
        return new Promise(function (resolve, reject) {
                db.query(
                    `insert into posts(title, body, publishedAt)
                     values ('${this.title}', '${this.body}', '${this.publishedAt}')`,
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
