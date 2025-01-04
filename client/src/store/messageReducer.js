import { createSlice } from "@reduxjs/toolkit";
import messageService from "../services/message";

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export const getMessages = (receiver) => {
  return async (dispatch) => {
    const messages = await messageService.getMessages(receiver);
    dispatch(setMessages(messages));
  };
};

export const sendMessage = (receiver) => {
  return async (dispatch) => {
    const message = await messageService.sendMessage(receiver);
    dispatch(addMessage(message));
  };
};

export default messageSlice.reducer;
