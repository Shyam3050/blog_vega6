const express = require("express");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");

const app = express();

// body parcer
app.use(express.json());

//routes
app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
// handlong unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
