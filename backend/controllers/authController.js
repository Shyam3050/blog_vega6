const expressAsync = require("express-async-handler");
const User = require("../models/userModal");
const { generateJWT } = require("../utils/jwt");


exports.registerUser = expressAsync(async (req, res, next) => {
  const { userName, email, password, pic } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    return next(new Error("Please provide name, email, and password."));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    return next(new Error("User already exists."));
  }

  const userDetails = await User.create({
    userName,
    email,
    password,
    pic,
  });

  if (userDetails) {
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: userDetails._id,
        userName: userDetails.userName, // Fix here: was `userDetails.userDetails`
        email: userDetails.email,
        pic: userDetails.pic,
        token: generateJWT(userDetails._id),
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed to create user.",
    });
  }
});


exports.login = expressAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("Please provide email and password."));
  }

  const userDetails = await User.findOne({ email }).select("+password");

  if (
    userDetails &&
    (await userDetails.matchPassword(password, userDetails.password))
  ) {
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        _id: userDetails._id,
        userName: userDetails.userName,
        email: userDetails.email,
        pic: userDetails.pic,
        token: generateJWT(userDetails._id),
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }
});
