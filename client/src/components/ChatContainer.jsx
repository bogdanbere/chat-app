import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../utils/Time";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../store/messageReducer";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.selectedUser);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (receiver?.id) {
      dispatch(getMessages(receiver.id));
    }
  }, [dispatch, receiver]);
  const messageEndRef = useRef(null);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100 pt-3 items-center justify-center bg-base-100/50 mb-6 mt-6 min-w-[358px] sm:min-w-[672px] lg:min-w-[650px]">
      <ChatHeader />
      <div className="flex-1 space-y-6 w-full min-w-[200px] mr-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.sender === user.id ? "chat-end" : "chat-start"
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
