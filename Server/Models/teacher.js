const db = require("../db");

class Teacher {
  constructor(name, specialty, gender, headmaster, subheadmaster) {
    this.name = name;
    this.specialty = specialty;
    this.gender = gender;
    this.headmaster = headmaster;
    this.subheadmaster = subheadmaster;
  }

  static async get(id) {
    let conn = await db.getConnection();
    return new Promise(function (resolve, reject) {
      conn
        .query(`SELECT * FROM teachers where teacher_id=${id}`)
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
  static async getHeadMasters() {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(`SELECT * FROM teachers where headmaster=1 or subheadmaster=1`)
        .then((data) => {
          conn.release();
          resolve(data);
        })
        .catch((reason) => {
          conn.release();
          reject();
        });
    });
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
  static async update(
    name,
    specialty,
    gender,
    headmaster,
    subheadmaster,
    teacher_id
  ) {
    let conn = await db.getConnection();

    return new Promise(function (resolve, reject) {
      conn
        .query(
          `update teachers
                 set name = '${name}',
                 specialty ='${specialty}',
                 gender ='${gender}',
                 headmaster='${headmaster}',
                 subheadmaster='${subheadmaster}'
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
    var that = this;
    let conn = await db.getConnection();
    return new Promise(function (resolve, reject) {
      conn
        .query(
          `insert into teachers(name,specialty,gender,headmaster,subheadmaster)
                 values ('${that.name}', '${that.specialty}', '${that.gender}','${that.headmaster}','${that.subheadmaster}')`
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

module.exports = Teacher;
