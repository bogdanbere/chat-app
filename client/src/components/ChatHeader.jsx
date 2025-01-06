import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/selectedUserReducer";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectedUser);

  return (
    <div className="p-2 sm:p-4 border-b border-base-300 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
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

          {/* User info */}
          <div>
            <h3 className="font-medium text-sm sm:text-base">
              {selectedUser.name}
            </h3>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="btn btn-sm sm:btn-md ml-3"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
