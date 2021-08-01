require("dotenv").config();
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const refreshToken = require("../models/RefreshToken");

//* This function checks the refresh token of the user and if he is valid she return new access token.

async function getNewToken(req, res) {
  const { refToken } = req.body;
  if (!refToken) {
    return res.status(400).send("Refresh token needed");
  }
  const checkToken = await refreshToken.findOne({ token: refToken });
  if (!checkToken) {
    return res.status(403).send("Invalid refresh token");
  }
  jwt.verify(refToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Refresh Token");
    }
    const { name, password } = decoded;
    const accessToken = jwt.sign(
      {
        result: {
          name,
          password,
        },
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.json({ accessToken });
  });
}

module.exports = getNewToken;
