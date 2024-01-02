const { Router } = require("express");
const { User } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({ username: username });
  if (findUser) {
    res.send({ msg: "User already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashPassword,
    });
    await newUser.save();
    res.send({ msg: "Success" });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({ username: username });
  if (findUser) {
    const isMatch = await bcrypt.compare(password, findUser.password);
    if(isMatch){
        const token = jwt.sign({username}, "SomeSecret")
        res.send({token: token, todos: findUser.todos})
    }else{
        res.send({ msg: "Incorrect Password"})
    }
  } else {
    res.send({ msg: "User Does not exist" });
  }
});

module.exports = router;
