import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SidebarLoading from "./loading/SidebarLoading";
import { Users } from "lucide-react";

const Sidebar = () => {
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  const friends = users.filter((u) => u.friends.includes(user.id));

  if (isUsersLoading) return <SidebarLoading />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Friends</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {friends.map((u) => (
          <button
            key={u.id}
            onClick={() => setSelectedUser(user)}
            className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${
                  selectedUser?.id === u.id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
              `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={u.profilePic || "/avatar.png"}
                alt={u.name}
                className="size-12 object-cover rounded-full"
              />
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{u.name}</div>
            </div>
          </button>
        ))}

        {friends.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
