const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "7d",
  });

  res.cookie("chatAppUser", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // true if mode is not development, so we can send cookies via http
  });

  return token;
};

module.exports = { generateToken };
