const express = require("express");
const getUserInfo = express.Router();
const getUserData = require("../utils/GetUserData");
//* Check if user token is valid
const { validateToken } = require("../Middlewares");

getUserInfo.get("/", validateToken, (req, res) => {
  try {
    getUserData(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = getUserInfo;
