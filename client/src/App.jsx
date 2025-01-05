import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { setUser } from "./store/userReducer";
import { changeTheme } from "./store/themeReducer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MePage from "./pages/MePage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import Loading from "./components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!window.localStorage.getItem("chatTheme")) {
      window.localStorage.setItem("chatTheme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("chatTheme");
    if (storedTheme) {
      dispatch(changeTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        setIsLoading(false);
        return;
      }
      await dispatch(setUser());
      setIsLoading(false);
    };
    fetchUser();
  }, [dispatch, location.pathname]);

  return (
    <div data-theme={theme} className="h-screen flex flex-col">
      {location.pathname !== "/404" && <Navbar />}

      <main className="flex-grow overflow-y-auto">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
          <Routes>
            <Route
              path="/"
              element={
                isLoading ? <Loading /> : user ? <HomePage /> : <LoginPage />
              }
            />
            <Route
              path="/login"
              element={
                isLoading ? <Loading /> : !user ? <LoginPage /> : <HomePage />
              }
            />
            <Route
              path="/signup"
              element={
                isLoading ? <Loading /> : !user ? <SignupPage /> : <HomePage />
              }
            />
            <Route
              path="/profile/me"
              element={
                isLoading ? <Loading /> : user ? <MePage /> : <LoginPage />
              }
            />
            <Route
              path="/profile/:id"
              element={user ? <ProfilePage /> : <LoginPage />}
            />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>

      {location.pathname !== "/404" && <Footer />}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
    </div>
  );
};

export default App;
