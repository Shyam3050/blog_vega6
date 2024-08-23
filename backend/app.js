const express = require("express");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const cors = require("cors");

const app = express();

// body parcer
app.use(express.json());

// cors

// cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-vega6.onrender.com",
    ],
  })
);
app.options("*", cors());

//routes
app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
// handlong unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
