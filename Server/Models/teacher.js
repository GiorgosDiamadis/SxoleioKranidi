const db = require("../db");

class Teacher {
  constructor(name, specialty, gender) {
    this.name = name;
    this.specialty = specialty;
    this.gender = gender;
  }

  static async getAll() {
    let conn = await db.getConnection();
    return new Promise(function (resolve, reject) {
      conn
        .query(`SELECT * FROM teachers`)
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
  static async update(name, specialty, gender, teacher_id) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `update teachers
                 set name = '${name}',
                 specialty ='${specialty}',
                 gender ='${gender}'
                 where teacher_id = ${teacher_id}`
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

  static async delete(teacher_id) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `delete
                 from teachers
                 where teacher_id = ${teacher_id}`
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

  async save() {
    this.publishedAt = new Date().toISOString();
    var that = this;
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `insert into teachers(name,specialty,gender)
                 values ('${that.name}', '${that.specialty}', '${that.gender}')`
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

module.exports = Teacher;
