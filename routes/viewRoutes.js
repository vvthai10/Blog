const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewController.getOverview);
router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/blog/:slug", viewController.getBlog);
router.get("/writeBlog", viewController.writeBlog);
router.get("/me", viewController.userLogin);
router.get("/user/:id", viewController.userOther);
// router.get("/me/:id", viewController.userOther);

module.exports = router;
