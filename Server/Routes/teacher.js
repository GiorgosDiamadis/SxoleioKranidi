const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");

const {
  getTeachers,
  saveTeacher,
  deleteTeacher,
  updateTeacher,
  getHeadmasters,
} = require("../Controllers/teacher");
const { saveValidation } = require("../Middleware/validateTeacher");

router.route("/").post(getTeachers);
router.route("/headmasters").post(getHeadmasters);
router.route("/create").post(isAuthenticated, saveValidation, saveTeacher);
router.route("/delete").post(isAuthenticated, deleteTeacher);
router.route("/update").post(isAuthenticated, saveValidation, updateTeacher);

module.exports = router;
