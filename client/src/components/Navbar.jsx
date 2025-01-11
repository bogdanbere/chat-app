import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogout } from "../store/userReducer";
import { changeTheme } from "../store/themeReducer";
import { setUsers } from "../store/usersReducer";
import { LogOut, House, User, SunMoon, Search, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Searchbar from "./Searchbar";
import useSocket from "../utils/useSocket";

const Navbar = () => {
  const { disconnect } = useSocket();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const allUsers = useSelector((state) => state.users);
  let users = [];
  if (user) {
    users = allUsers.filter((u) => u.id !== user.id);
  }

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("chatTheme");
    if (storedTheme) {
      dispatch(changeTheme(storedTheme));
    } else {
      window.localStorage.setItem("chatTheme", theme);
    }
  }, [dispatch, theme]);

  const handleLogout = () => {
    disconnect();
    dispatch(authLogout());
    setIsSearchVisible(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleChangeTheme = () => {
    setIsMenuOpen(false);
    if (theme === "fantasy") {
      dispatch(changeTheme("dracula"));
      window.localStorage.setItem("chatTheme", "dracula");
    } else {
      dispatch(changeTheme("fantasy"));
      window.localStorage.setItem("chatTheme", "fantasy");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleBoth = () => {
    setIsMenuOpen(false);
    setIsSearchVisible(false);
  };

  // Search bar props
  const handleOnSearch = (string, results) => {
    const filteredResults = results.filter((item) =>
      item.name.toLowerCase().includes(string.toLowerCase())
    );
    return filteredResults.length > 0 ? filteredResults : [];
  };

  const handleOnSelect = (item) => {
    navigate(`/profile/${item.id}`);
  };

  const formatResult = (item) => {
    return (
      <>
        <Link
          to={`/profile/${item.id}`}
          style={{ display: "block", textAlign: "left" }}
        >
          {item.name}
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <House className="w-5 h-5 text-primary" />
          </div>
          <h1
            className={`self-center text-2xl font-semibold whitespace-nowrap ${
              theme === "light" ? "text-black" : "text-grey"
            }`}
          >
            {user ? user.name : "Chat App"}
          </h1>
        </Link>

        {/* Searchbar for Desktop */}
        {user && (
          <div className="flex-1 hidden md:flex justify-center">
            <Searchbar
              handleOnSearch={handleOnSearch}
              formatResult={formatResult}
              handleOnSelect={handleOnSelect}
              items={users}
              placeholder="Users"
            />
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          {user && (
            <button
              type="button"
              onClick={toggleSearchBar}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          >
            <Menu className="w-5 h-5" />{" "}
            {/* Replace the SVG with the Menu component from lucide-react */}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center gap-2 hidden md:flex">
          <button className="btn btn-sm gap-2" onClick={handleChangeTheme}>
            <SunMoon className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {user && (
            <>
              <Link
                to="/profile/me"
                className="btn btn-sm gap-2"
                onClick={toggleBoth}
              >
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button className="btn btn-sm gap-2" onClick={handleLogout}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-base-100/80 p-4">
          <button className="btn btn-sm gap-2 mb-2" onClick={handleChangeTheme}>
            <SunMoon className="size-5" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {user && (
            <>
              <Link
                to="/profile/me"
                className="btn btn-sm gap-2 mb-2"
                onClick={toggleBoth}
              >
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button className="btn btn-sm gap-2 mb-2" onClick={handleLogout}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Mobile Search Bar */}
      {isSearchVisible && user && (
        <div className="md:hidden flex justify-center p-4">
          <Searchbar
            handleOnSearch={handleOnSearch}
            handleOnSelect={handleOnSelect}
            formatResult={formatResult}
            users={users}
            styling={styling}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
