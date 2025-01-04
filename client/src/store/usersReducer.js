import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import { toast } from "react-toastify";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsersList(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
    updateFriendsList(state, action) {
      const { friendId } = action.payload;
      const friend = state.find((f) => f.id === friendId);

      if (!friend.friends.includes(friendId)) {
        friend.friends = [...friend.friends, friendId];
      }
    },
  },
});

export const { setUsersList, addUser, updateFriendsList } = usersSlice.actions;

export const setUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsersList(users));
    } catch (err) {
      toast.error("A problem occured on the server");
    }
  };
};

export const signup = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials);
      dispatch(addUser(user));
      toast.success("User created successfully");
    } catch (err) {
      toast.error("Sign up failed");
    }
  };
};

export const addFriendsForFriend = (friendId) => {
  return async (dispatch) => {
    try {
      await userService.updateFriends(friendId);
      dispatch(updateFriendsList(friendId));
      toast.success("Friend added successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export default usersSlice.reducer;
