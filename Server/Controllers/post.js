const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const Post = require("../Models/post");
const {validationResult} = require("express-validator");

module.exports.getPosts = catchAsync(async (req, res, next) => {
    const all = await Post.getAll();
    res.status(200).send(all)
});
module.exports.savePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    const {title, body} = req.body;

    const newPost = new Post(title, body);

    const rs = await newPost.save();
    res.status(200).send({rs});

});
module.exports.deletePost = catchAsync(async (req, res, next) => {
    const { post_id} = req.body;

    const rs = await Post.delete(post_id)
    res.status(200).send({rs});

});
module.exports.updatePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    const {title, body,post_id} = req.body;

    const rs = await Post.update(title,body,post_id);

    res.status(200).send(rs);
});