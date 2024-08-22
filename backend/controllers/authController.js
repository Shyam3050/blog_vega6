const expressAsync = require("express-async-handler");
const User = require("../models/userModal");
const { generateJWT } = require("../utils/jwt");


exports.registerUser = expressAsync(async (req, res, next) => {
  const { userName, email, password, pic } = req.body;

  if ((!userName, !email, !password)) {
    res.status(400);
    next(new Error("Please Enter name, email, password."));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    next(new Error("User Already exist."));
  }

  const userDetails = await User.create({
    userName,
    email,
    password,
    pic,
  });
  if (userDetails) {
    res.status(201).json({
      _id: userDetails._id,
      userName: userDetails.userDetails,
      email: userDetails.email,
      pic: userDetails.pic,
      token: generateJWT(userDetails._id),
    });
  } else {
    res.status(400).json({
      data: "failed to create userDetails.",
    });
  }
});

exports.login = expressAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userDetails = await User.findOne({ email }).select("+password");
  console.log(userDetails);

  if (
    userDetails &&
    (await userDetails.matchPassword(password, userDetails.password))
  ) {
    res.status(200).json({
      _id: userDetails._id,
      userName: userDetails.userName,
      email: userDetails.email,
      pic: userDetails.pic,
      token: generateJWT(userDetails._id),
    });
  } else {
    res.status(400).json({
      data: "User not found",
    });
  }
});
