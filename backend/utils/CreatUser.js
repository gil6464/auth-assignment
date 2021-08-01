const User = require("../models/User");
const { hashSync } = require("bcrypt");

async function createUser(req, res) {
  const { user } = req.body;
  const hashedPassword = hashSync(user.password, 10);
  user.password = hashedPassword;
  const newUser = new User(user);
  try {
    await newUser.save();
    return res.status(201).send("User created successfully");
  } catch (error) {
    return res.status(403).send("User name or email is already in use!");
  }
}

module.exports = createUser;
