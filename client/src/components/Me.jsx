import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userReducer";
import { Camera, User, ALargeSmall } from "lucide-react";

const Me = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleImageUpload = async (e) => {
    setIsUpdatingProfile(true);
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
    setIsUpdatingProfile(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    const data = {
      profilePic: selectedImg || user.profilePic,
      name: e.target.name.value.trim() || user.name,
    };
    await dispatch(updateUser(data));
    setIsUpdatingProfile(false);
  };
  return (
    <form
      className="min-h-screen w-full pt-20 flex flex-col items-center bg-base-200 overflow-y-auto mb-12 mt-12"
      onSubmit={handleUpdateProfile}
    >
      <div className="max-w-6xl w-full bg-base-300 p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-base-content">
            Edit Profile
          </h1>
          <p className="mt-2 ">Update your profile information below</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section: Avatar Upload */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <img
                src={selectedImg || user.profilePic || "/avatar.png"}
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover border-4 border-primary"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-primary p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm ">
              {isUpdatingProfile
                ? "Uploading your new avatar..."
                : "Click the camera icon to upload a new profile picture"}
            </p>
          </div>

          {/* Right Section: Editable Fields */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-1 flex items-center gap-2"
              >
                <ALargeSmall className="w-5 h-5" />
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 bg-base-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={user.name || "Your Name"}
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm  mb-1 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Username
              </label>
              <p className="px-4 py-2 bg-base-100 rounded-lg border ">
                {user.username}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-12 bg-base-200 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4 text-base-content">
            Account Information
          </h2>
          <div className="space-y-3 text-sm ">
            <div className="flex items-center justify-between border-b pb-2">
              <span>Member Since</span>
              <span>{user.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={isUpdatingProfile}
            className={`px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-focus transition-all duration-200 ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Me;
