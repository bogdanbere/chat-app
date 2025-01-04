import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import messageReducer from "./messageReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    messages: messageReducer,
  },
});

export default store;
