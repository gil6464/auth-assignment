const User = require("../models/User");

async function getUserData(req, res) {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }

  return;
}

module.exports = getUserData;
