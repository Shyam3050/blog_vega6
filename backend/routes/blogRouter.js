const express = require("express");
// const { registerUser, login } = require("../controllers/authController");

const router = express.Router();

router.route("/").post(registerUser);


module.exports = router;
