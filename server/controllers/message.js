const messageRouter = require("express").Router();
const Message = require("../models/message");
const cloudinary = require("../utils/cloudinary");
const { io, getReceiverSocketId } = require("../utils/socket");

// Get messages sent to or received by a user
messageRouter.get("/:id", async (req, res, next) => {
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
    console.log(`Error in Message Router: ${err}`);
    next(err);
  }
});

// Send message
messageRouter.post("/:id", async (req, res, next) => {
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

    const newMessage = await message.save();

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(`Error in Message Router: ${err}`);
    next(err);
  }
});

module.exports = messageRouter;
