const express = require("express");
const {
  deleteBlog,
  getBlog,
  getAllBlog,
  newBlog,
  updateBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.route("/").get(getAllBlog).post(newBlog)
router.route("/:id").get(getBlog).delete(deleteBlog).patch(updateBlog)


module.exports = router;
