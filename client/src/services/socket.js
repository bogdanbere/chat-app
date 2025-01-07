import { io } from "socket.io-client";
export let onlineUsers = [];

const socket = io("http://localhost:6969", {
  withCredentials: true,
});

export const socketLogin = (user, socket) => {
  socket.auth = { userId: user.id };
  socket.connect();

  socket.on("getOnlineUsers", (userIds) => {
    onlineUsers = userIds;
  });
};

export const socketLogout = (socket) => {
  if (socket.connected) socket.disconnect();
};

export const checkAuth = (user, socket) => {
  socket.auth = { userId: user.id };
  socket.connect();

  socket.on("getOnlineUsers", (userIds) => {
    onlineUsers = userIds;
  });
};

export const subscribeToMessages = (user, socket) => {
  socket.on("newMessage", (message) => {
    const isMessageSentByReceiver = message.sender === user.id;
    if (isMessageSentByReceiver) return;
  });
};

export const unsubscribeFromMessages = (socket) => {
  socket.off("newMessage");
};

export default socket;
