const express = require("express");
const logOutUser = express.Router();
const logOut = require("../utils/Logout.js");

logOutUser.delete("/", (req, res) => {
  try {
    logOut(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

module.exports = logOutUser;
