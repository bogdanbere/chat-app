const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");
const bcrypt = require("bcryptjs");

// Get logged user
userRouter.get("/me", middleware.userExtractor, (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// Get all users minus logged user
userRouter.get("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const loggedUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    return res.status(200).json(user);
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
    const { profilePic, name } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      // TODO: add cloudinary
      { profilePic, name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

userRouter.put(
  "/add-friend",
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const { friendId } = req.body;
      const userId = req.user._id;

      if (userId === friendId) {
        return res
          .status(400)
          .json({ message: "You cannot add yourself as a friend" });
      }

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Already friends" });
      }

      user.friends.push(friendId);
      await user.save();

      friend.friends.push(userId);
      await friend.save();

      res.status(200).json({ message: "Friend added successfully" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = userRouter;
