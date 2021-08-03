const express = require("express");
const updateUser = express.Router();
const updateUserFunc = require("../utils/UpdateUser");

updateUser.patch("/", (req, res) => {
  try {
    updateUserFunc(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

module.exports = updateUser;
