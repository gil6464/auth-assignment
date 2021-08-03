const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const signIn = require("./api-routes/SignIn");
const loginUser = require("./api-routes/Login");
const logOut = require("./api-routes/Logout");
const updateUser = require("./api-routes/UpdateUser");
const getUserInfo = require("./api-routes/GetUserInfo");
const getToken = require("./api-routes/GetToken");

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "/build/")));

app.use("/signIn", signIn);
app.use("/login", loginUser);
app.use("/logOut", logOut);
app.use("/updateUser", updateUser);
app.use("/getUserInfo", getUserInfo);
app.use("/getToken", getToken);

app.get("*", (req, res) => {
  console.log(path.join(__dirname, "/build/index.html"));

  return res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
