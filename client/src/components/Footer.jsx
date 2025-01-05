import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300 fixed bottom-0 w-full z-40">
      <div className="container mx-auto px-4 py-2 text-center">
        <h1 className="text-lg font-bold mb-2 hidden sm:block">ChatApp</h1>
        <div className="flex items-center justify-center">
          <Link
            to="https://github.com/bogdanbere/chat-app"
            target="_blank"
            className="btn btn-sm gap-2 px-4 mx-auto flex items-center"
          >
            <Github className="w-5 h-5 text-primary" />
            <span className="hidden sm:inline">Link to Github page</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
