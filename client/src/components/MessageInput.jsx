import { useRef, useState } from "react";
import { sendMessage } from "../store/messageReducer";
import { Image, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isTextFocused, setIsTextFocused] = useState(false);
  const receiver = useSelector((state) => state.selectedUser);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await dispatch(
        sendMessage(receiver.id, {
          text: text.trim(),
          image: imagePreview,
        })
      );

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error("Message could not be sent");
    }
  };

  const handleTextInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="w-full ml-1">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 ml-7">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 ml-6"
      >
        <div
          className="flex-1 flex gap-2 mr-2 justify-around"
          onFocus={() => setIsTextFocused(true)}
          onBlur={() => setIsTextFocused(false)}
        >
          <textarea
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md resize-none"
            placeholder="Type a message..."
            value={text}
            onChange={handleTextInputChange}
            style={{
              minHeight: isTextFocused ? "120px" : "40px",
              maxWidth: "500px",
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="flex justify-around">
            <button
              type="button"
              className={`btn btn-circle ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>

            <button
              type="submit"
              className="btn btn-circle ml-2" // Small left margin
              disabled={!text.trim() && !imagePreview}
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MessageInput;
