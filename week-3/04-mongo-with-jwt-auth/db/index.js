const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mongodb:prouddaddy%4008@mango.8uhvicf.mongodb.net/mongo-with-jwt?retryWrites=true&w=majority"
);


// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    required: true, // Ensures that the field is not null
    unique: true,  // Ensures that the field is unique
  },
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    required: true, // Ensures that the field is not null
    unique: true,  // Ensures that the field is unique
  },
  password: String,
  purchasedCourses: Array
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  author: String,
  title: String,
  description: String,
  price: Number,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
