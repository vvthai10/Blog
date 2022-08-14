const path = require("path"); // Create path auto
const express = require("express");
const morgan = require("morgan"); // Use print info about time, status

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const interactiveRouter = require("./routes/interactiveRoutes");
const viewRouter = require("./routes/viewRoutes");
const uploadRouter = require("./routes/uploadRouter");

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fs = require("fs");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    sameSite: "none",
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use("/", viewRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/interactive", interactiveRouter);
app.use("/api/v1/uploads", uploadRouter);
app.post("/cookies-test", function (req, res) {
  res.cookie("name", "express").send("cookie set"); //Sets name = express
});

// Sau khi tìm hết trong các đường dẫn phía trên không có đường dẫn nào thỏa yêu cầu thì sẽ tới route này và bị coi là lỗi
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Đây phải là hàm middleware cuối cùng vì nó là điểm đến của mọi hàm khi bị bắt lỗi
app.use(globalErrorHandler);

module.exports = app;
