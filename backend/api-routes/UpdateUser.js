const express = require("express");
const updateUser = express.Router();
const updateUserFunc = require("../utils/UpdateUser");
//* Check if user token is valid
const { validateToken } = require("../Middlewares");

updateUser.patch("/", validateToken, (req, res) => {
  try {
    updateUserFunc(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

module.exports = updateUser;
