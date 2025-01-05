const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helpers");
const cloudinary = require("../utils/cloudinary");

// Get logged user
userRouter.get("/me", middleware.userExtractor, (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    console.log(`Error in User Router: ${err}`);
    next(err);
  }
});

// Get all users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (err) {
    console.log(`Error in User Router: ${err}`);
    next(err);
  }
});

// Get user by id
userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.log(`Error in User Router: ${err}`);
    next(err);
  }
});

// Sign up
userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  try {
    if (!username || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
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
    console.log(`Error in User Router: ${err}`);
    next(err);
  }
});

// Update profile picture and name
userRouter.patch("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const { profilePic, name } = req.body;
    const user = req.user;
    let imageUrl = "";

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      imageUrl = uploadResponse.secure_url;
    }

    if (!imageUrl && !name) {
      return res.status(400).json({
        message:
          "At least one field (profilePic or name) must be provided for update",
      });
    }

    const updateData = {};
    if (imageUrl) updateData.profilePic = imageUrl;
    if (name) updateData.name = name;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(`Error in PATCH /user: ${err.message}`);
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
      console.log(`Error in User Router: ${err}`);
      next(err);
    }
  }
);

module.exports = userRouter;
