const messageRouter = require("express").Router();
const Message = require("../models/message");
const middleware = require("../utils/middleware");
const cloudinary = require("../utils/cloudinary");

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

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = new Message({
      sender,
      receiver,
      text,
      image: imageUrl,
    });

    // TODO: implement websockets

    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
});

module.exports = messageRouter;
