const expressAsync = require("express-async-handler");
const Blog = require("../models/blogModal");

exports.newBlog = expressAsync(async (req, res, next) => {
  const { title, img, description } = req.body;
  if ((!title, !img, !description)) {
    res.status(400);
    next(new Error("Please Enter name, email, password."));
  }

  const blogDetails = await Blog.create({
    title,
    img,
    description,
  });

  if (blogDetails) {
    res.status(201).json({
      _id: blogDetails._id,
    });
  } else {
    res.status(400).json({
      data: "failed to create blog.",
    });
  }
});

exports.updateBlog = expressAsync(async (req, res, next) => {
  const { id, updatedData } = req.body;
  const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
  
  if (blogDetails) {
    res.status(201).json({
      status: "success"
    });
  } else {
    res.status(400).json({
      data: "failed to update blog.",
    });
  }
});
