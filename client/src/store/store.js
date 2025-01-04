import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import messageReducer from "./messageReducer";
import themeReducer from "./themeReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    messages: messageReducer,
    theme: themeReducer,
  },
});

export default store;
