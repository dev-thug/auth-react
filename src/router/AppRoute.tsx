import { Route, Routes } from "react-router-dom";

import AccountPage from "pages/AccountPage";
import MainPage from "pages/MainPage";
import SignInPage from "pages/SignInPage";
import SignUpLinkConfirmPage from "pages/SignUpLinkConfirmPage";
import SignUpPage from "pages/SignUpPage";
import SignUpTotpConfirmPage from "pages/SignUpTotpConfirmPage";

const AppRoute = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/link/:jwt" element={<SignUpLinkConfirmPage />} />
    <Route path="/totp/:jwt" element={<SignUpTotpConfirmPage />} />
    <Route path="/account" element={<AccountPage />} />
  </Routes>
);

export default AppRoute;
