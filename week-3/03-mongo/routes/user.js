const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    password: password,
  });

  try {
    await newUser.save();
    res.send({ msg: "User created Successfully" });
  } catch (err) {
    res.send({ msg: "User already exists" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find();
  res.send(allCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const course = await Course.findOne({ _id: req.params.courseId });
  const foundUser = await User.findOne({ username: username }, {purchasedCourses: true});
  let purchasedCourses = [...foundUser.purchasedCourses, course];
  foundUser.purchasedCourses = purchasedCourses;
  await foundUser.save();
  res.send({ message: 'Course purchased successfully' });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const foundUser = await User.findOne({ username: username }, {purchasedCourses: true});
  res.send({ courses: foundUser.purchasedCourses });
});

module.exports = router;