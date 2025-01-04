import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { setUser } from "./store/userReducer";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return (
    <div data-theme={theme}>
      <LoginPage />
      {/* <Routes>
        <Route />
      </Routes> */}
    </div>
  );
};

export default App;
