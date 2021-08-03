const express = require("express");
const getToken = express.Router();
const getNewToken = require("../utils/RefreshToken");

getToken.post("/", (req, res) => {
  try {
    getNewToken(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = getUserInfo;
