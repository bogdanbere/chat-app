import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import { useSelector } from "react-redux";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  //TODO: Add functionality for online users
  return (
    <div className="flex h-screen bg-base-200 mt-6 mb-20">
      <div className="flex items-center justify-center pt-20 px-4 w-full">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] lg:min-w-[850px] sm:min-w-[358px] flex">
          <div className="sidebar sticky top-0 h-full z-10">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
