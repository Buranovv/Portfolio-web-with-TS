import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import FrontLayout from "./components/layout/fronLayout/FrontLayout";
import AccountPage from "./pages/account/AccountPage";
import NotUsersPage from "./pages/admin-client/client-users";
import DashboardPage from "./pages/admin-client/dashboard";
import EducationPage from "./pages/admin-client/education";
import ExperiencesPage from "./pages/admin-client/experiences";
import PortfolioPage from "./pages/admin-client/portfolio";
import SkillsPage from "./pages/admin-client/skills";
import UsersPage from "./pages/admin-client/users";
import LoginPage from "./pages/public/auth/login";
import RegisterPage from "./pages/public/auth/register";
import HomePage from "./pages/public/home/HomePage";
import NotFoundPage from "./pages/public/notFound";
import WaitPage from "./pages/public/waitPage";
import useAuth from "./zustand/auth";

function App() {
  const { isAuth, role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/waitPage"
          element={isAuth && role === "user" ? <WaitPage /> : null}
        />

        <Route
          element={
            (isAuth && role === "admin") || role === "client" ? (
              <AdminLayout />
            ) : (
              <Navigate
                to={`${isAuth && role === "client" ? "/clientDashboard" : "/"}`}
              />
            )
          }
        >
          <Route
            path={`${role === "admin" ? "admin" : "client"}/account`}
            element={<AccountPage />}
          />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          {role === "admin" ? (
            <Fragment>
              <Route path="users/notClientUsers" element={<NotUsersPage />} />
              <Route path="users" element={<UsersPage />} />
            </Fragment>
          ) : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
