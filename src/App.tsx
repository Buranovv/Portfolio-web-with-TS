import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ClientLayout from "./components/layout/ClientLayout";
import FrontLayout from "./components/layout/fronLayout/FrontLayout";
import { AuthContext } from "./context/Auth";
import AccountPage from "./pages/account";
import LoginPage from "./pages/public/Auth/LoginPage";
import RegisterPage from "./pages/public/Auth/RegisterPage";
import EducationPage from "./pages/public/education/EducationPage";
import HomePage from "./pages/public/home/HomePage";
import SkillsPage from "./pages/public/skills/SkillsPage";
import WaitPage from "./pages/public/waitPage";

function App() {
  const { isAuth, user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/waitPage"
          element={isAuth && user === "user" ? <WaitPage /> : null}
        />
        <Route
          element={
            isAuth && user == "client" ? <ClientLayout /> : <Navigate to="/" />
          }
        >
          <Route path="account" element={<AccountPage />} />
          <Route path="skillsPage" element={<SkillsPage />} />
          <Route path="educationPage" element={<EducationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
