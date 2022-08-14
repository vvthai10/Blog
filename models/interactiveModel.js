const mongoose = require("mongoose");
const Blog = require("./blogModel");

const interactiveSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      default: "",
    },
    liked: {
      type: Number,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: [true, "Interactive must belong to a blog"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Interactive must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

interactiveSchema.index({ blog: 1, user: 1 }, { unique: true });

interactiveSchema.pre(/^find/, function (next) {
  this.populate({
    path: "blog",
    select: "name",
  }).populate({
    path: "user",
    select: "name photo",
  });

  next();
});
// { $multiply: [ "$price", "$quantity" ] }
// {"name": {$lt: "F", $gt: "C"}}
interactiveSchema.statics.calcTotalLikedAndComment = async function (blogId) {
  const stats = await this.aggregate([
    {
      $match: { blog: blogId },
    },
    {
      $group: {
        _id: "$blog",
        nLiked: { $sum: "$liked" },
        nComment: { $sum: { $strcasecmp: ["$comment", ""] } },
      },
    },
  ]);

  if (stats.length > 0) {
    await Blog.findByIdAndUpdate(blogId, {
      nLiked: stats[0].nLiked,
      nComment: stats[0].nComment,
    });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      nLiked: 0,
      nComment: 0,
    });
  }
};

interactiveSchema.post("save", function (next) {
  this.constructor.calcTotalLikedAndComment(this.blog);
});

interactiveSchema.pre(/^findOneAnd/, async function (next) {
  console.log("step 1");
  this.r = await this.findOne();
  next();
});

interactiveSchema.post(/^findOneAnd/, async function (next) {
  console.log("step 2");
  console.log(this.r.blog.id);
  console.log(this.r.blog._id);
  // await this.findOne() does NOT work here, query has already executed
  await this.r.constructor.calcTotalLikedAndComment(this.r.blog._id);
  // next()
});

const Interactive = mongoose.model("Interactive", interactiveSchema);

module.exports = Interactive;
