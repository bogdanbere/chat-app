import { Link } from "react-router-dom";
import { authLogout } from "../store/userReducer";
import { changeTheme } from "../store/themeReducer";
import { LogOut, House, User, SunMoon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <House className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ChatApp</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-sm gap-2" onClick={handleChangeTheme}>
              <SunMoon className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </button>

            {user && (
              <>
                <Link to={"/profile/me"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <div className="flex gap-2 items-center">
                  <button className="btn btn-sm gap-2" onClick={handleLogout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
