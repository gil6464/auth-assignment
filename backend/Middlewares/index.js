const { ACCESS_TOKEN_SECRET } = process.env;
const jwt = require("jsonwebtoken");

//* This function checks if user access token is valid

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access Token Required");
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(303).send("Invalid Access Token");
    }
    req.user = decoded;
    next();
  });
}

module.exports = { validateToken };
