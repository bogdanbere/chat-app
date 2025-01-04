import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

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
    const users = await userService.getAll();
    dispatch(setUsersList(users));
  };
};

export const signup = (credentials) => {
  return async (dispatch) => {
    const user = await userService.signup(credentials);
    dispatch(addUser(user));
  };
};

export const addFriendsForFriend = (friendId) => {
  return async (dispatch) => {
    await userService.updateFriends(friendId);
    dispatch(updateFriendsList(friendId));
  };
};

export default usersSlice.reducer;
