const friendRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

// Friends for sidebar
friendRouter.get("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user.friends) return res.status(200).json([]);

    const userFriends = await Promise.all(
      user.friends.map((friendId) =>
        User.findById(friendId).select("-password")
      )
    );

    res.status(200).json(userFriends);
  } catch (err) {
    next(err);
  }
});

// Get friends by id
friendRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

// Add friend
friendRouter.put("/", middleware.userExtractor, async (req, res, next) => {
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
});

module.exports = friendRouter;
