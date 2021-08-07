const db = require("../db");

class Post {
  constructor(title, body, summary) {
    this.title = title;
    this.body = body;
    this.summary = summary;
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
                     FROM posts where post_id=${post_id}`,
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
        `insert into posts(title, body,summary ,publishedAt)
                     values ('${that.title}', '${that.body}','${that.summary}', '${that.publishedAt}')`,
        function (err, res) {
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
