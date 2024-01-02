const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTKEY;

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const findUser = await User.findOne({ username: username });
  if (findUser) {
    res.send({ msg: "User already exists" });
  } else {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hash,
    });
    await newUser.save();
    res.send({ msg: "User Created" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement User signup logic
  const username = req.body.username;
  const password = req.body.password;

  const findUser = await User.findOne({ username: username });
  if (!findUser) {
    res.send({ msg: "User does not exist!" });
  } else {
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      res.send({ msg: "incorrect Password" });
    } else {
      const bearerToken = jwt.sign({ username: username }, jwtSecret);
      res.send({ token: bearerToken });
    }
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
  const foundUser = await User.findOne(
    { username: username },
    { purchasedCourses: true }
  );
  let purchasedCourses = [...foundUser.purchasedCourses, course];
  foundUser.purchasedCourses = purchasedCourses;
  await foundUser.save();
  res.send({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const foundUser = await User.findOne(
    { username: username },
    { purchasedCourses: true }
  );
  res.send({ courses: foundUser.purchasedCourses });
});

module.exports = router;
