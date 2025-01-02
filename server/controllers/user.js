const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

// Update profile picture
userRouter.put("/update", middleware.userExtractor, async (req, res, next) => {
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

// Add friend
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
