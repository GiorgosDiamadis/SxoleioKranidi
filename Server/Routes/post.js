const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middleware/isAuthenticated");

const {
  getPosts,
  savePost,
  deletePost,
  updatePost,
} = require("../Controllers/post");
const { saveValidation } = require("../Middleware/validatePost");

router.route("/").post(getPosts);
router.route("/create").post(savePost);
router.route("/delete").post(isAuthenticated, deletePost);
router.route("/update").post(isAuthenticated, saveValidation, updatePost);

module.exports = router;
