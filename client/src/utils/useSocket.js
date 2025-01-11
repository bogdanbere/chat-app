import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const useSocket = (userId = null) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(
      import.meta.env.MODE === "development" ? "http://localhost:6969" : "/",
      { query: { userId } }
    );

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers([...userIds]);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userId]);

  const connect = useCallback(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket?.connected) {
      socket.disconnect();
    }
  }, [socket]);

  const subscribe = (selectedUser, callback) => {
    if (!socket?.connected) return;
    socket.on("newMessage", (message) => {
      if (message.sender !== selectedUser) return;
      return callback(message);
    });
  };

  const unsubscribe = () => {
    if (socket && socket.connected) {
      socket.off("newMessage");
    }
  };

  return {
    onlineUsers,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
  };
};

export default useSocket;
