const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const { validationResult } = require("express-validator");
const { saveValidation } = require("../Middleware/validateTeacher");
const Teacher = require("../Models/teacher");

module.exports.getTeacher = catchAsync(async (req, res, next) => {
  const { teacher_id } = req.body;
  console.log(teacher_id);
  const teacher = await Teacher.get(teacher_id);
  res.status(200).send(teacher);
});

module.exports.getTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.getAll();
  res.status(200).send(teachers);
});
module.exports.getHeadmasters = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.getHeadMasters();
  res.status(200).send(teachers);
});
module.exports.saveTeacher = catchAsync(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).send(error);
    return;
  }

  console.log(req.body);

  const { name, specialty, gender, headmaster, subheadmaster } = req.body;
  const teacher = new Teacher(
    name,
    specialty,
    gender,
    headmaster,
    subheadmaster
  );
  const result = await teacher.save();
  console.log("saving");
  console.log(result);
  res.status(200).send("success");
});
module.exports.deleteTeacher = catchAsync(async (req, res, next) => {
  const { teacher_id } = req.body;

  if (teacher_id === null || teacher_id === undefined) {
    res.status(400);
    return;
  }
  const result = await Teacher.delete(teacher_id);
  res.status(200).send(result);
});
module.exports.updateTeacher = catchAsync(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).send(error);
    return;
  }

  const { name, specialty, gender, teacher_id, headmaster, subheadmaster } =
    req.body;

  const result = await Teacher.update(
    name,
    specialty,
    gender,
    headmaster,
    subheadmaster,
    teacher_id
  );
  res.status(200).send(result);
});
