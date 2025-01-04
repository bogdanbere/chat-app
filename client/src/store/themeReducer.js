import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    setTheme(state, action) {
      if (state === "light") {
        return "dark";
      } else if (state === "dark") {
        return "light";
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const changeTheme = () => {
  return (dispatch) => {
    dispatch(setTheme());
  };
};

export default themeSlice.reducer;
