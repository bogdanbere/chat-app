const authenticationRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helpers.js");

// Sign up
authenticationRouter.post("/signup", async (req, res, next) => {
  const { username, name, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      password: passwordHash,
    });

    // Generate token
    generateToken(user._id, res);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

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
