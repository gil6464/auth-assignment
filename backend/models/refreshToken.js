const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const RefreshTokenSchema = new Schema({
  token: String,
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
