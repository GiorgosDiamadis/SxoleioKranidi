const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const Post = require("../Models/post");
const {validationResult} = require("express-validator");
const {v2: cloudinary} = require("cloudinary");
const fs = require("fs");

module.exports.getPosts = catchAsync(async (req, res, next) => {
    const {amount} = req.body;
    let posts;
    if (amount) {
        posts = await Post.getAll(amount);
    } else {
        posts = await Post.getAll();
    }

    res.status(200).send(posts);
});
module.exports.getPost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;

    let post = await Post.get(post_id);

    res.status(200).send(post);
});
module.exports.savePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    let imgURL = null;

    if (req.files !== null) {
        const file = req.files.file;
        const filePath = `${__dirname}/${file.name}`

        await file.mv(filePath);


        const uploadRes = await cloudinary.uploader.upload(filePath)
        imgURL = cloudinary.image(uploadRes.public_id, {height: 366,width: 600, crop: "scale"})
        imgURL = [imgURL.slice(0, 4), " class='rounded-xl'", imgURL.slice(4)].join('');
        await fs.unlinkSync(filePath)
    }

    const {title, body, summary} = req.body;
    const newPost = new Post(title, body, summary, imgURL);
    console.log(newPost)

    const rs = await newPost.save();

    res.status(200).send({rs});

});
module.exports.deletePost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;

    const rs = await Post.delete(post_id);
    res.status(200).send({rs});
});
module.exports.updatePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    const {title, body, post_id} = req.body;

    const rs = await Post.update(title, body, post_id);

    res.status(200).send(rs);
});
