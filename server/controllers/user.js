const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");
const bcrypt = require("bcryptjs");

// Get all users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

// Sign up
userRouter.post("/", async (req, res, next) => {
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

// Update profile picture
userRouter.put("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      // TODO: add cloudinary
      { profilePic },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
