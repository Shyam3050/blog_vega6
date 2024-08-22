const express = require("express");
const authRouter = require("./routes/authRouter");

const app = express();

// body parcer
app.use(express.json());



//routes
app.use("/api/user", authRouter);
app.use("/api/blog", authRouter);

module.exports = app;
