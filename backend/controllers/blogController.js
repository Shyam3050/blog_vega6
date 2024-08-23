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
      success: true,
      message: "Blog created successfully",
      data: blogDetails,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed to create blog",
    });
  }
});

exports.updateBlog = expressAsync(async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedBlog) {
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
});

exports.deleteBlog = expressAsync(async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

exports.getBlog = expressAsync(async (req, res, next) => {
  const blog = await Blog.find({
    _id: req.params.id,
  });
  if (blog.length > 0) {
    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
});

exports.getAllBlog = expressAsync(async (req, res, next) => {
  const blogs = await Blog.find({});
  if (blogs.length > 0) {
    res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve blogs",
    });
  }
});
