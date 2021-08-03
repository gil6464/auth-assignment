const User = require("../models/User");

async function updateUserFunc(req, res) {
  const { user } = req.body;
  try {
    await User.findByIdAndUpdate(user.userId, {
      userName: user.userName,
      email: user.email,
      company: user.company,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
    });
    res.status(201).send("Updated");
  } catch (error) {
    console.log(error);
    res.send(401).send("User name or email are already in use");
  }
}

module.exports = updateUserFunc;
