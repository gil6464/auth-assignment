const express = require("express");
const getUserInfo = express.Router();
const getUserData = require("../utils/getUserData");

getUserInfo.get("/", (req, res) => {
  try {
    getUserData(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = getUserInfo;
