const db = require("../db");
var {cloudinary} = require("../Cloudinary");

class Post {
    constructor(title, body, summary, img_url,public_id) {
        this.title = title;
        this.body = body;
        this.summary = summary;
        this.img_url = img_url;
        this.public_id = public_id;
    }

    static getAll(amount) {
        return new Promise(function (resolve, reject) {
            db.query(
                `SELECT *
                 FROM posts ${amount !== undefined ? `order by post_id desc limit ${amount}` : ""}`,
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

    static update(title, body, summary,imgURL,public_id, post_id) {
        return new Promise(function (resolve, reject) {
            db.query(
                `update posts
                 set title='${title}',
                     body='${body}',
                     summary='${summary}',
                     imgURL="${imgURL}",
                     public_id='${public_id}'
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
                `insert into posts(title, body, summary, publishedAt, imgURL,public_id)
                 values ('${that.title}', '${that.body}', '${that.summary}', '${that.publishedAt}', "${that.img_url}",'${that.public_id}')`,
                function (err, res) {
                    if (err) throw err;
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
