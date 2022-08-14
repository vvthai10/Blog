const express = require("express");
const interactiveController = require("./../controllers/interactiveController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// router.use(authController.protect)

router
  .route("/")
  .get(interactiveController.getAllInteractive)
  .post(
    interactiveController.setBlogUserIds,
    interactiveController.createInteractive
  );

// CÁC CHỨC NĂNG CHỈ DÀNH CHO ADMIN THỰC HIỆN
// router.use(authController.restrictTo('admin'))

router
  .route("/:id/:blog")
  .patch(interactiveController.updateInteractiveWithIdBlog);

router
  .route("/:id")
  .get(interactiveController.getInteractive)
  .patch(interactiveController.updateInteractive)
  .delete(interactiveController.deleteInteractive);

module.exports = router;
