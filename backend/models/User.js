const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const userSchema = new Schema({
  userName: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  company: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
