const db = require("../db");
var { cloudinary } = require("../Cloudinary");

class Post {
  constructor(title, body, summary, img_url, public_id) {
    this.title = title;
    this.body = body;
    this.summary = summary;
    this.img_url = img_url;
    this.public_id = public_id;
  }

  static async getAll(amount) {
    let conn = await db.getConnection();
    return new Promise(function (resolve, reject) {
      conn
        .query(
          `SELECT *
                 FROM posts ${
                   amount !== undefined
                     ? `order by post_id desc limit ${amount}`
                     : ""
                 }`
        )
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

  static async get(post_id) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `SELECT *
                 FROM posts
                 where post_id = ${post_id}`
        )
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

  static async update(title, body, summary, imgURL, public_id, post_id) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `update posts
                 set title='${title}',
                     body='${body}',
                     summary='${summary}',
                     imgURL="${imgURL}",
                     public_id='${public_id}'
                 where post_id = ${post_id}`
        )
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

  static async delete(post_id) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `delete
                 from posts
                 where post_id = ${post_id}`
        )
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

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }

  async save() {
    this.publishedAt = new Date().toISOString();
    var that = this;
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `insert into posts(title, body, summary, publishedAt, imgURL, public_id)
                 values ('${that.title}', '${that.body}', '${that.summary}', '${that.publishedAt}', "${that.img_url}",
                         '${that.public_id}')`
        )
        .then((data) => {
          conn.release();
          resolve(data.insertId);
        })
        .catch(() => {
          conn.release();
          reject();
        });
    });
  }
}

module.exports = Post;
