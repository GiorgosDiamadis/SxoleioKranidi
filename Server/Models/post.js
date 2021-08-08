const db = require("../db");
var {cloudinary} = require("../Cloudinary")

class Post {
    constructor(title, body, summary, img_url) {
        this.title = title;
        this.body = body;
        this.summary = summary;
        this.img_url = img_url;
    }

    static getAll(amount) {
        return new Promise(function (resolve, reject) {
            db.query(
                `SELECT *
                 FROM posts ${
                         amount !== undefined ? `LIMIT ${amount}` : ""
                 }`,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static get(post_id) {
        return new Promise(function (resolve, reject) {
            db.query(
                `SELECT *
                 FROM posts
                 where post_id = ${post_id}`,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static update(title, body, summary, post_id) {
        console.log("sdf");
        return new Promise(function (resolve, reject) {
            db.query(
                `update posts
                 set title='${title}',
                     body='${body}',
                     summary='${summary}'
                 where post_id = ${post_id}`,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    if (res === undefined) reject();
                    else resolve(res);
                }
            );
        });
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
            );
        });
    }

    getTitle() {
        return this.title;
    }

    getBody() {
        return this.body;
    }

    save() {
        this.publishedAt = new Date().toISOString();
        var that = this;
        return new Promise(function (resolve, reject) {
            db.query(
                `insert into posts(title, body, summary, publishedAt, imgURL)
                 values ('${that.title}', '${that.body}', '${that.summary}', '${that.publishedAt}', "${that.img_url}")`,
                function (err, res) {
                    if (err) throw err
                    if (res === undefined) {
                        reject();
                    } else {
                        resolve(res.insertId);
                    }
                }
            );
        });
    }
}

module.exports = Post;
