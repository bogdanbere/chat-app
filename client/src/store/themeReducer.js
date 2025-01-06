import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "fantasy",
  reducers: {
    setTheme(state, action) {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const changeTheme = (theme) => {
  return (dispatch) => {
    dispatch(setTheme(theme));
  };
};

export default themeSlice.reducer;
