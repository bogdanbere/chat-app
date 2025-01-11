import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/selectedUserReducer";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import useSocket from "../utils/useSocket";
import Searchbar from "./Searchbar";

const ChatHeader = ({ messages }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectedUser);
  const { onlineUsers } = useSocket();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleOnSearch = (string, results) => {
    const filteredResults = results.filter((item) =>
      item.text.toLowerCase().includes(string.toLowerCase())
    );
    return filteredResults.length > 0 ? filteredResults : [];
  };

  const handleOnSelect = (item) => {
    const messageElement = document.getElementById(`message-${item.id}`);
    if (messageElement)
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const formatResult = (item) => (
    <div key={item.id} className="p-2 cursor-pointer">
      <p>{item.text}</p>
    </div>
  );

  const toggleSearchBar = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div className="p-2 sm:p-4 border-b border-base-300 w-full">
      <div className="flex items-center justify-between">
        {/* User Details */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-8 sm:size-10 rounded-full relative">
              <Link to={`/profile/${selectedUser.id}`}>
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.name}
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm sm:text-base">
              {selectedUser.name}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Search Bar for Desktop */}
        <div className="flex-1 hidden md:flex justify-center">
          <Searchbar
            handleOnSelect={handleOnSelect}
            formatResult={formatResult}
            handleOnSearch={handleOnSearch}
            items={messages}
            placeholder="Search messages..."
            type="message"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleSearchBar}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="btn btn-sm sm:btn-md"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchVisible && (
        <div className="md:hidden flex justify-center p-4">
          <Searchbar
            handleOnSelect={handleOnSelect}
            formatResult={formatResult}
            handleOnSearch={handleOnSearch}
            items={messages}
            placeholder="Search messages..."
            type="message"
          />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
