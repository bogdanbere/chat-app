import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: null,
  reducers: {
    setSelected(state, action) {
      return action.payload;
    },
  },
});

export const { setSelected } = selectedUserSlice.actions;

export const setSelectedUser = (user) => {
  return (dispatch) => {
    dispatch(setSelected(user));
  };
};

export default selectedUserSlice.reducer;
