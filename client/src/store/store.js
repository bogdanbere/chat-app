import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import messageReducer from "./messageReducer";
import themeReducer from "./themeReducer";
import selectedUserReducer from "./selectedUserReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    messages: messageReducer,
    theme: themeReducer,
    selectedUser: selectedUserReducer,
  },
});

export default store;
