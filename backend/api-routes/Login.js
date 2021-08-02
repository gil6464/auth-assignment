const express = require("express");
const loginUser = express.Router();
const login = require("../utils/login");

loginUser.post("/", (req, res) => {
  try {
    login(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = loginUser;
