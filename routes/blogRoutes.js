const express = require("express");
const blogController = require("./../controllers/blogController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

router
  .route("/slug/:slug")
  .patch(blogController.updateBlogWithSlug)
  .delete(blogController.deleteBlogWithSlug);

module.exports = router;
