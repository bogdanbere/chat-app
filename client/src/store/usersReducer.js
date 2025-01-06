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
      const { friend, user } = action.payload;

      const updatedFriend = {
        ...friend,
        friends: [...friend.friends, user.id],
      };

      return state.map((u) => (u.id !== friend.id ? u : updatedFriend));
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

export const addFriendsForFriend = (users) => {
  return async (dispatch) => {
    const { friend, user } = users;
    try {
      await userService.updateFriends(friend.id);
      dispatch(updateFriendsList({ friend, user }));
      toast.success("Friend added successfully");
    } catch (err) {
      console.log("Error in usersReducer");
      toast.error(err.message);
    }
  };
};

export default usersSlice.reducer;
