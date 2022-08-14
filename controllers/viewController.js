const Blog = require("./../models/blogModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const page = req.query.page;
  const limit = 5;
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.find();
  const length = totalBlogs.length;

  const temp = !(length % limit === 0) ? 1 : 0;

  var totalPage;
  if (length % limit !== 0) {
    totalPage = (length % limit) + 1;
  } else {
    totalPage = length / limit;
  }

  const blogs = await Blog.find({
    deleted: false,
  })
    .sort("timeRead")
    .skip(skip)
    .limit(limit);

  res.status(200).render("overview", {
    title: "Home",
    blogs,
    page,
    totalPage,
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

exports.getSignup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup");
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const blog = await Blog.findOne({ slug, deleted: false }).populate({
    path: "interactive",
    fields: "comment liked createAt user",
  });

  // 1. Kiểm tra người dùng đang đăng nhập hay không.

  // 1. Người đó đã từng bình luận chưa
  // 2. Kiểm tra người dùng đó có từng thích bài viết hay chưa
  var liked = false;
  var comment = false;
  if (res.locals.user) {
    blog.interactive.forEach((e) => {
      if (e.user.id === res.locals.user.id && e.liked === 1) {
        // console.log(e);
        liked = true;
      }
      if (e.user.id === res.locals.user.id && e.comment !== "") {
        comment = true;
      }
    });
  }
  // 2. Xóa các tương tác có bình luận trống

  res.status(200).render("blog", {
    title: `${blog.name}`,
    liked,
    comment,
    blog,
  });
});

exports.writeBlog = catchAsync(async (req, res, next) => {
  res.status(200).render("writeBlog", {
    title: "Viết Blog",
  });
});

exports.userLogin = catchAsync(async (req, res, next) => {
  var blogs;
  var tag = 0;
  if (req.query.setting == "") {
    tag = 1;
  } else if (req.query.recycleBin == "") {
    tag = 2;
  }

  if (tag == 0) {
    blogs = await Blog.find({
      author: res.locals.user._id,
      deleted: false,
    }).select("name slug");
  } else if (tag == 2) {
    blogs = await Blog.find({
      author: res.locals.user._id,
      deleted: true,
    }).select("name slug");
  }

  console.log(blogs);

  res.status(200).render("userLogin", {
    title: res.locals.user.name,
    tag,
    blogs,
  });
});

exports.userOther = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const blogs = await Blog.find({
    author: req.params.id,
    deleted: false,
  }).select("name slug");

  console.log(blogs);

  res.status(200).render("userOther", {
    title: user.name,
    userOther: user,
    blogs,
  });
});
