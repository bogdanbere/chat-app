import { createSlice } from "@reduxjs/toolkit";
import authenticationService from "../services/authentication";
import userService from "../services/user";
import { toast } from "react-toastify";

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
      const friend = action.payload;
      const updatedUser = { ...state, friends: [...state.friends, friend.id] };
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
    try {
      const userLoggingIn = await authenticationService.login(user);
      dispatch(setLoggedUser(userLoggingIn));
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error("Wrong credentials");
    }
  };
};

export const authLogout = () => {
  return async (dispatch) => {
    try {
      await authenticationService.logout();
      dispatch(removeLoggedUser());
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("A problem occured on the server");
    }
  };
};

export const setUser = () => {
  return async (dispatch) => {
    try {
      const user = await userService.getMe();
      if (user) {
        dispatch(setLoggedUser(user));
      } else {
        return state;
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        toast.error("A problem occured on the server");
      }
    }
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.update(data);
      dispatch(updateLoggedUser(updatedUser));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
};

// Backend is updated in usersReducer, here we just update the state of logged user
export const addUserFriend = (friend) => {
  return async (dispatch) => {
    dispatch(updateUserFriendsList(friend));
  };
};

export default userSlice.reducer;
