const authenticationRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helpers.js");

// Log in
authenticationRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    correctPassword =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && correctPassword)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// Log out
authenticationRouter.post("/logout", async (req, res, next) => {
  try {
    res.cookie("chatAppUser", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = authenticationRouter;
