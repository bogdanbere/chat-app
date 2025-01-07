const express = require("express");
const { server } = require("./utils/socket");
const config = require("./utils/config");
const { app } = require("./utils/socket");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authenticationRouter = require("./controllers/authentication");
const userRouter = require("./controllers/user");
const messageRouter = require("./controllers/message");
const middleware = require("./utils/middleware");

// MongoDB setup
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/authentication", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/message", middleware.userExtractor, messageRouter);

// Error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Start server
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
