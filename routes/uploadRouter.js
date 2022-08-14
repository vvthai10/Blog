const path = require("path");
const express = require("express");
const uploadController = require("./../controllers/uploadController");
const upload = require("./../utils/uploadMiddleware");
const Resize = require("./../utils/resize");

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const router = express.Router();

router.post(
  "/photoUser",
  upload.single("photoUserUpload"),
  uploadController.photoUser
);

// router.post(
//   "/photoUser",
//   upload.single("photoUserUpload"),
//   async function (req, res) {
//     var imagePath = path.join(__dirname, "..", "public", "images", "users");
//     const fileUpload = new Resize(imagePath);
//     if (!req.file) {
//       res.status(401).json({ error: "Please provide an image" });
//     }
//     console.log(req.file);
//     const filename = await fileUpload.save(req.file.buffer);
//     return res.status(200).json({ name: filename });
//   }
// );

router.use(multipartMiddleware);
router.post("/image", uploadController.image);

module.exports = router;
