const express = require("express");
const signIn = express.Router();
const createUser = require("../utils/CreatUser");

signIn.post("/", (req, res) => {
  try {
    createUser(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = signIn;
