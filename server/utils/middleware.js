const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "Expected `username` to be unique" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token invalid" });
  }
  next(err);
};

const userExtractor = async (req, res, next) => {
  try {
    const token = req.cookies["chatAppUser"];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { errorHandler, userExtractor };
