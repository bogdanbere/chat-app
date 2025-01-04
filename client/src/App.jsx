import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { setUser } from "./store/userReducer";
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
    const fetchUser = async () => {
      await dispatch(setUser());
      setIsLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div data-theme={theme}>
      {location.pathname === "/404" ? null : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? <Loading /> : user ? <HomePage /> : <LoginPage />
          }
        />
        <Route path="/login" element={!user ? <LoginPage /> : <HomePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <HomePage />} />
        <Route path="/profile/me" element={user ? <MePage /> : <LoginPage />} />
        <Route
          path="/profile/:id"
          element={user ? <ProfilePage /> : <LoginPage />}
        />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>

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
      {location.pathname === "/404" ? null : <Footer />}
    </div>
  );
};

export default App;
