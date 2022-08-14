/* eslint-disable no-console */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./../../models/blogModel');
// const User = require('./../../models/userModel');
const Interactive = require('./../../models/interactiveModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log(DB)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/blogs.json`, 'utf-8')
);
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
// );
const interactives = JSON.parse(
  fs.readFileSync(`${__dirname}/interactives.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Blog.create(blogs);
    await Interactive.create(interactives)
    // await User.create(users, { validateBeforeSave: false});
    // await Review.create(reviews);
    console.log('Data successfully loaded!');
    process.exit()
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await Blog.deleteMany();
    await Interactive.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit()
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
