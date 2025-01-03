import { createSlice } from "@reduxjs/toolkit";
import authenticationService from "../services/authentication";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
    removeLoggedUser(state, action) {
      return null;
    },
  },
});

export const { setLoggedUser, removeLoggedUser } = userSlice.actions;

export const authLogin = (user) => {
  return async (dispatch) => {
    const userLoggingIn = await authenticationService.login(user);
    dispatch(setLoggedUser(userLoggingIn));
  };
};

export const authLogout = () => {
  return async (dispatch) => {
    dispatch(authenticationService.logout());
  };
};

export const setUser = () => {
  return (dispatch) => {
    const loggedUserCookie = Cookies.get("chatAppUser");
    if (loggedUserCookie) {
      const user = JSON.parse(loggedUserCookie);
      dispatch(setLoggedUser(user));
    }
  };
};

export default userSlice.reducer;
