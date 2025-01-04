import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
