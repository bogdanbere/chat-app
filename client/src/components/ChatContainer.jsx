import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToMessages, getMessages } from "../store/messageReducer";
import useSocket from "../utils/useSocket";

const ChatContainer = ({ onlineUsers }) => {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.selectedUser);
  const user = useSelector((state) => state.user);
  const messages = useSelector((state) => state.messages);
  const selectedUser = useSelector((state) => state.selectedUser);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { subscribe, unsubscribe } = useSocket(user.id);

  // Fetch messages and subscribe to updates
  useEffect(() => {
    dispatch(getMessages(selectedUser.id));
    subscribe(selectedUser.id, (message) => {
      dispatch(subscribeToMessages(message));
    });
    return () => unsubscribe();
  }, [selectedUser.id, dispatch, subscribe]);

  // Detect whether the user is at the bottom of the chat
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10); // Add a small margin
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Scroll to the bottom when necessary
  useEffect(() => {
    if (isAtBottom && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100 items-center justify-center bg-base-100/50 mb-6 mt-1 min-w-[358px] sm:min-w-[672px] lg:min-w-[650px]">
      <ChatHeader onlineUsers={onlineUsers} messages={messages} />

      <div
        className="flex-1 space-y-6 w-full min-w-[200px] overflow-auto"
        ref={chatContainerRef}
      >
        {[
          ...new Map(messages.map((message) => [message.id, message])).values(),
        ].map((message) => (
          <div
            key={message.id}
            id={`message-${message.id}`}
            className={`chat ${
              message.sender === user.id ? "chat-end mr-8" : "chat-start ml-8"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-8 sm:size-10 rounded-full border">
                <img
                  src={
                    message.sender === user.id
                      ? user.profilePic || "/avatar.png"
                      : receiver.profilePic || "/avatar.png"
                  }
                  alt="profile"
                />
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
            <div className="chat-bubble max-w-[300px] sm:max-w-[400px] min-w-[200px] p-3 rounded-lg">
              {message.image && (
                <Link to={message.image} target="_blank">
                  <img
                    src={message.image}
                    alt="attachment"
                    className="max-w-[150px] sm:max-w-[200px] rounded-md"
                  />
                </Link>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
