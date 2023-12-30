const { Router } = require("express");
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new Admin({
    username: username,
    password: password,
  });

  try{
    await newUser.save();
    res.send({msg: "Admin created Successfully"})
  }catch(err){
    res.send({msg: "Admin already exists"})
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
