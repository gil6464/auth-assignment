const RefreshToken = require("../models/refreshToken");

async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.send("Refresh Token Required").status(400);
  }
  try {
    await RefreshToken.deleteOne({ token: refreshToken });
    res.status(204).end();
  } catch {
    res.send("Invalid Refresh Token").status(400);
  }
}
module.exports = logout;
