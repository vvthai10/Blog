const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Interactive = require("./../models/interactiveModel");

exports.getAllInteractive = catchAsync(async (req, res, next) => {
  const doc = await Interactive.find();

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.setBlogUserIds = (req, res, next) => {
  if (!req.body.blog) {
    req.body.blog = req.params.blogId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

exports.getInteractive = catchAsync(async (req, res, next) => {
  const doc = await Interactive.findById(req.params.id);

  if (!doc) {
    return next(new AppError(`Don't have doc with ID`, 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createInteractive = catchAsync(async (req, res, next) => {
  console.log(
    ">>>>>>>>>>>>>>>>>>>>> CREATE INTERACTIVE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  const newDoc = await Interactive.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      data: newDoc,
    },
  });
});

exports.updateInteractive = catchAsync(async (req, res, next) => {
  const doc = await Interactive.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // check lại các điều kiện trong model
  });

  if (!doc) {
    return next(new AppError(`Don't have doc with ID`, 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updateInteractiveWithIdBlog = catchAsync(async (req, res, next) => {
  console.log(
    ">>>>>>>>>>>>>>>>>>>>> UPDATE INTERACTIVE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );
  // Tìm kiếm dữ liệu
  var data;
  if (req.body.liked) {
    data = { liked: req.body.liked };
  }
  if (req.body.comment) {
    data = { comment: req.body.comment };
  }
  const doc = await Interactive.findOneAndUpdate(
    {
      user: req.params.id,
      blog: req.params.blog,
    },
    data
  );

  if (!doc) {
    return next(new AppError(`Don't have doc with ID`, 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.deleteInteractive = catchAsync(async (req, res, next) => {
  const doc = await Interactive.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(`Don't have doc with ID`, 400));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
