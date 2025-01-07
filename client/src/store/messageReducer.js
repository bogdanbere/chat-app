import { createSlice } from "@reduxjs/toolkit";
import messageService from "../services/message";
import { toast } from "react-toastify";

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
    try {
      const messages = await messageService.getMessages(receiver);
      dispatch(setMessages(messages));
    } catch (err) {
      toast.error("A problem occured on the server");
    }
  };
};

export const sendMessage = (receiver, data) => {
  return async (dispatch) => {
    try {
      const message = await messageService.sendMessage(receiver, data);
      dispatch(addMessage(message));
    } catch (err) {
      if (err.response.status === 413) {
        toast.error("Attachment too large");
      }
      toast.error("Message could not be sent");
    }
  };
};

export default messageSlice.reducer;
