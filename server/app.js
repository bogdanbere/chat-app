const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const middleware = require("./utils/middleware");
const authenticationRouter = require("./controllers/authentication");
const userRouter = require("./controllers/user");
const messageRouter = require("./controllers/message");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("error connecting to MongoDB:", err.message);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    // Allow cookies
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/authentication", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/message", middleware.userExtractor, messageRouter);
app.use(middleware.errorHandler);

module.exports = app;
