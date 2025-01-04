import { createSlice } from "@reduxjs/toolkit";
import authenticationService from "../services/authentication";
import userService from "../services/user";

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
    updateLoggedUser(state, action) {
      const { profilePic, name } = action.payload;
      const updatedUser = { ...state, profilePic, name };
      return updatedUser;
    },
    updateUserFriendsList(state, action) {
      const { friendId } = action.payload;
      const updatedUser = { ...state, friends: [...state.friends, friendId] };
      return updatedUser;
    },
  },
});

export const {
  setLoggedUser,
  removeLoggedUser,
  updateLoggedUser,
  updateUserFriendsList,
} = userSlice.actions;

export const authLogin = (user) => {
  return async (dispatch) => {
    const userLoggingIn = await authenticationService.login(user);
    dispatch(setLoggedUser(userLoggingIn));
  };
};

export const authLogout = () => {
  return async (dispatch) => {
    await authenticationService.logout();
    dispatch(removeLoggedUser());
  };
};

export const setUser = () => {
  return async (dispatch) => {
    const user = await userService.getMe();
    dispatch(setLoggedUser(user));
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const updatedUser = await userService.update(user);
    dispatch(updateLoggedUser(updatedUser));
  };
};

// Backend is updated in usersReducer, here we just update the state of logged user
export const addUserFriend = (friendId) => {
  return async (dispatch) => {
    dispatch(updateUserFriendsList(friendId));
  };
};

export default userSlice.reducer;
