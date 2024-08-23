const expressAsync = require("express-async-handler");
const Blog = require("../models/blogModal");

exports.newBlog = expressAsync(async (req, res, next) => {
  const { title, image, description, userid } = req.body;
  if ((!title, !image, !description)) {
    res.status(400);
    next(new Error("Please Enter name, email, password."));
  }

  const blogDetails = await Blog.create({
    title,
    image,
    description,
    userid,
  });

  if (blogDetails) {
    res.status(201).json({
      _id: blogDetails._id,
       data: "blog created successfully"
    });
  } else {
    res.status(400).json({
      data: "failed to create blog.",
    });
  }
});

exports.updateBlog = expressAsync(async (req, res, next) => {

  const blogDetails = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (blogDetails) {
    res.status(201).json({
      status: "success",
    });
  } else {
    res.status(400).json({
      data: "failed to update blog.",
    });
  }
});

exports.deleteBlog = expressAsync(async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
  });
});

exports.getBlog = expressAsync(async (req, res, next) => {
  const blogs = await Blog.find({ userid: req.params.id });
  if (blogs.length > 0) {
    res.status(200).json({
      blogs,
    });
  } else {
    res.status(400).json({
      data: "failed to get blog.",
    });
  }
});

exports.getAllBlog = expressAsync(async (req, res, next) => {
  const blogs = await Blog.find({});
  if (blogs.length > 0) {
    res.status(200).json({
      blogs,
    });
  } else {
    res.status(400).json({
      data: "failed to get blog.",
    });
  }
});
