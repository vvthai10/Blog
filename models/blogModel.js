const mongoose = require("mongoose");
const slugify = require("slugify");
const convertToEnglish = require("./../utils/nonAccentVietnamese");

const domPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

const { stripHtml } = require("string-strip-html");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A blog have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    topic: {
      type: String,
      default: "other",
      enum: {
        values: [
          "machine-learning",
          "deep-learning",
          "computer-science",
          "web-developer",
          "data-science",
          "mobile-apps",
          "other",
        ],
      },
    },
    description: {
      type: String,
      trim: true,
      // Nếu người dùng không nhập vào thì sẽ trích một đoạn trong cái phàn main để làm
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    timeRead: {
      type: Number,
      require: [true, "You can have limit time read it"],
    },
    imageCover: {
      type: String,
      // require: [true, 'A blog must have a cover image'],
      default: "default-cover.png",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "Blog need a author"],
    },
    mainContent: {
      type: String,
      require: [true, "Blog have a main content"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    nLiked: {
      type: Number,
      default: 0,
    },
    nComment: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Dùng để lấy ra các thông tin về sự tương tác với bài viết
blogSchema.virtual("interactive", {
  ref: "Interactive",
  foreignField: "blog",
  localField: "_id",
});

blogSchema.pre("save", function (next) {
  this.slug = slugify(convertToEnglish(this.name), { lower: true });

  console.log(`Before description: ${this.description}`);
  console.log(stripHtml(this.mainContent.substring(0, 200)));
  this.mainContent = htmlPurify.sanitize(this.mainContent);
  this.description = stripHtml(this.mainContent.substring(0, 200)).result;
  next();
});

// Dùng để lọc ra những bài viết đã TẠM XÓA
// blogSchema.pre(/^find/, function (next) {
//   this.find({ deleted: { $eq: false } });

//   next();
// });

// Dùng để lấy thống tin của tác giả bài viết, gồm tên và hình ảnh tác giả
blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name photo",
  });

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
