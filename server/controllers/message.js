const messageRouter = require("express").Router();
const User = require("../models/user");
const Message = require("../models/message");
const middleware = require("../utils/middleware");

// Get messages sent to or received by a user
messageRouter.get("/:id", middleware.userExtractor, async (req, res, next) => {
  try {
    const { id: receiver } = req.params;
    const sender = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Send message
messageRouter.post("/:id", middleware.userExtractor, async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiver } = req.params;
    const sender = req.user._id;

    // let imageUrl;
    // TODO: implement cloudinary and websockets

    const message = new Message({
      sender,
      receiver,
      text,
      image,
    });

    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
});

module.exports = messageRouter;
