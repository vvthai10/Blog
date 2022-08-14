const path = require("path");
const fs = require("fs");
const catchAsync = require("./../utils/catchAsync");
const Resize = require("./../utils/resize");

exports.photoUser = catchAsync(async (req, res, next) => {
  console.log("Starting update photo....");
  var imagePath = path.join(__dirname, "..", "public", "images", "users");
  const fileUpload = new Resize(imagePath);

  console.log(req.file);
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const filename = await fileUpload.save(req.file.buffer);

  return res.status(200).json({ status: "success", photoNew: filename });
});

exports.image = catchAsync(async (req, res, next) => {
  fs.readFile(req.files.upload.path, function (err, data) {
    var newPath = path.join(
      __dirname,
      "..",
      "public",
      "upload",
      req.files.upload.name
    );

    fs.writeFile(newPath, data, function (err) {
      if (err) console.log({ err: err });
      else {
        console.log(req.files.upload.originalFilename);

        let fileName = req.files.upload.name;
        let url = "/upload/" + fileName;
        let msg = "Upload successfully";
        let funcNum = req.query.CKEditorFuncNum;
        console.log({ url, msg, funcNum });

        res
          .status(201)
          .send(
            "<script>window.parent.CKEDITOR.tools.callFunction('" +
              funcNum +
              "','" +
              url +
              "','" +
              msg +
              "');</script>"
          );
      }
    });
  });
});
