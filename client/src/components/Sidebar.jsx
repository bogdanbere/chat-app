import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/selectedUserReducer";
import { Users, ListCollapse, X } from "lucide-react";
import { onlineUsers } from "../services/socket";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const selectedUser = useSelector((state) => state.selectedUser);
  const theme = useSelector((state) => state.theme);

  const selectUser = (user) => {
    if (isSidebarOpen) setIsSidebarOpen(false);
    dispatch(setSelectedUser(user));
  };

  const friends = users.filter((u) => u.friends.includes(user.id));
  const online = friends.filter((f) => onlineUsers.includes(f.id));

  const friendsArray = showOnlineOnly ? online : friends;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-24 left-6 z-50 bg-base-300 p-2 rounded-full shadow-lg -mt-4"
          onClick={handleToggleSidebar}
        >
          <ListCollapse className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar Component */}
      <aside
        className={`mb-6 fixed z-50 h-full w-72 border-r border-base-300 flex flex-col transition-transform transform duration-300 ease-in-out lg:max-w-[250px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-72 ${
          isSidebarOpen && theme === "fantasy"
            ? "bg-white"
            : isSidebarOpen && theme === "dracula"
            ? "bg-gray-600"
            : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-base-300 w-full p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-medium hidden lg:block">Friends</span>
          </div>

          {/* Close Button (visible on mobile only) */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-base-300"
            onClick={handleToggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Body */}
        <div className="overflow-y-auto w-full py-3">
          {/* Online Friends Toggle */}
          <div className="p-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
              <span>Show Online Only</span>
            </label>
            <span className="text-xs">({onlineUsers.length - 1} online)</span>
          </div>

          {friendsArray.map((u) => (
            <button
              key={u.id}
              onClick={() => selectUser(u)}
              className={`
            w-full flex items-center gap-3
            hover:bg-base-300 transition-colors m-0
            ${
              selectedUser?.id === u.id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }
          `}
            >
              <div className="w-full p-3 flex items-center gap-2 lg:gap-3 hover:bg-base-300 transition-colors">
                <div className="relative flex-shrink-0">
                  <img
                    src={u.profilePic || "/avatar.png"}
                    alt={u.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>

                <div className="text-left min-w-0">
                  <div className="font-medium truncate text-sm lg:text-base">
                    {u.name}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {friends.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No online users
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
