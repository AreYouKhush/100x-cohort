const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let requests = 1;
let numberOfRequestsForUser = {};

function rateLimit(req, res, next) {
  const userId = req.header["user-id"];
  setInterval(() => {
    numberOfRequestsForUser = {};
  }, 1000);
  numberOfRequestsForUser = {
    user: userId,
    requests: requests++,
  };
  if (numberOfRequestsForUser.requests >= 5) {
    requests = 1;
    return res.status(404).json({
      msg: "Nothing"
    });
  } else {
    next();
  }
}

app.use(rateLimit);


app.get("/user", function (req, res) {
  res.status(200).json({ name: "john", request: numberOfRequestsForUser.requests });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.listen(3000)

module.exports = app;
