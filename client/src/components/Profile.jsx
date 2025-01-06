import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFriendsForFriend } from "../store/usersReducer";
import { addUserFriend } from "../store/userReducer";
import { ALargeSmall, User } from "lucide-react";

const Profile = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { id: friendId } = useParams();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const friend = users.find((u) => u.id === friendId);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (friend?.id && user.friends.includes(friend.id)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [friend?.id, user, user.friends]);

  useEffect(() => {
    if (friend && user.id === friend?.id) {
      navigate("/profile/me");
    }
  }, [user.id, friend?.id, navigate]);

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    await dispatch(addFriendsForFriend({ friend, user }));
    await dispatch(addUserFriend(friend));
    setIsAdding(false);
    setIsFriend(true);
  };

  return (
    <div className="min-h-screen w-full pt-20 flex flex-col items-center bg-base-200 overflow-y-auto mb-12 mt-12">
      <div className="max-w-6xl w-full bg-base-300 p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-base-content">
            {friend?.name}
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section: Avatar Upload */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <img
                src={friend?.profilePic || "/avatar.png"}
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover border-4 border-primary"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm  mb-1 flex items-center gap-2"
              >
                <ALargeSmall className="w-5 h-5" />
                Name
              </label>
              <p className="px-4 py-2 bg-base-100 rounded-lg border ">
                {friend?.name}
              </p>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm mb-1 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Username
              </label>
              <p className="px-4 py-2 bg-base-100 rounded-lg border ">
                {friend?.username}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-12 bg-base-200 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4 text-base-content">
            Account Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b  pb-2">
              <span>Member Since</span>
              <span>{friend?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

        {/* Add Friend Button */}
        <form onSubmit={handleAddFriend} className="text-center mt-8">
          {!isFriend ? (
            <button
              type="submit"
              disabled={isAdding}
              className={`px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-focus transition-all duration-200 ${
                isAdding ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              {isAdding ? "Adding..." : "Add Friend"}
            </button>
          ) : (
            <p>You are already friends</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
