const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTKEY;

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const findUser = await Admin.findOne({ username: username });
  if (findUser) {
    res.send({ msg: "Admin already exists" });
  } else {
    const hash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username: username,
      password: hash,
    });
    await newAdmin.save();
    res.send({ msg: "Admin Created" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const findUser = await Admin.findOne({ username: username });
  if (!findUser) {
    res.send({ msg: "User does not exist!" });
  } else {
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      res.send({ msg: "incorrect Password" });
    } else {
      const bearerToken = jwt.sign({username: username}, "secret");
      res.send({ token: bearerToken });
    }
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const username = req.headers.username;

  const newCourse = new Course({
    author: username,
    title: title,
    description: description,
    price: price,
    published: true,
  })

  await newCourse.save();

  res.send({newCourse});
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find();
  res.send(allCourses);
});

module.exports = router;
