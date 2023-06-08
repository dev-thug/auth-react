import { Route, Routes } from "react-router-dom";

import MainPage from "pages/MainPage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";

const AppRoute = () => (
  <Routes>
    <Route path="" element={<MainPage />} />
    <Route path="signin" element={<SignInPage />} />
    <Route path="signup" element={<SignUpPage />} />
  </Routes>
);

export default AppRoute;
