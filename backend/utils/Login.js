require("dotenv").config();
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const user = require("../models/User");
const refreshToken = require("../models/RefreshToken");

//* This function receive userName + password, and compare the password with bcrypt.

async function login(req, res) {
  const { userName, password } = req.body;
  const loginUser = await user.findOne({ userName });

  if (!loginUser) {
    return res.status(403).send("User or password incorrect");
  }
  const checkPass = await compare(password, loginUser.password);
  if (!checkPass) {
    return res.status(403).send("User or password incorrect");
  }
  const accessToken = jwt.sign(loginUser.toJSON(), ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const newRefreshToken = jwt.sign(loginUser.toJSON(), REFRESH_TOKEN_SECRET);
  new refreshToken({ token: newRefreshToken }).save();
  res.json({ userName, accessToken, newRefreshToken });
}

module.exports = login;
