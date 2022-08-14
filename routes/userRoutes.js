const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// ĐÂY LÀ CÁC HÀM MÀ TẤT CẢ CÁC USER ĐƯỢC DÙNG
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

// ĐÂY LÀ CÁC HÀM CẦN PHẢI ĐĂNG NHẬP
router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);

// ĐÂY LÀ CÁC HÀM ĐƯỢC THỰC HIỆN BỞI ADMIN
// router.use(authController.restrictTo('admin'))

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  //.delete(userController.removeUser)
  .delete(userController.deleteUser);

module.exports = router;
