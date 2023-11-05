import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import FrontLayout from "./components/layout/fronLayout/FrontLayout";
import AccountPage from "./pages/account/AccountPage";
import NotUsersPage from "./pages/admin/client-users";
import DashboardPage from "./pages/admin/dashboard";
import EducationPage from "./pages/admin/education";
import ExperiencesPage from "./pages/admin/experiences";
import PortfolioPage from "./pages/admin/portfolio";
import ClientDashboard from "./pages/client/ClientDashboard";
import LoginPage from "./pages/public/auth/login";
import RegisterPage from "./pages/public/auth/register";
import HomePage from "./pages/public/home/HomePage";
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
        <Route
          path="/waitPage"
          element={isAuth && role === "user" ? <WaitPage /> : null}
        />
        <Route
          element={
            isAuth && role === "client" ? (
              <ClientLayout />
            ) : (
              <Navigate to={`${role === "admin" ? "/dashboard" : "/"}`} />
            )
          }
        >
          <Route path="account" element={<AccountPage />} />
          <Route path="clientDashboard" element={<ClientDashboard />} />
        </Route>
        <Route
          element={
            isAuth && role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate
                to={`${isAuth && role === "client" ? "/clientDashboard" : "/"}`}
              />
            )
          }
        >
          <Route path="admin/account" element={<AccountPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users/notClientUsers" element={<NotUsersPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          {/* <Route path="skills" element={<SkillsPage />} /> */}
          <Route path="portfolio" element={<PortfolioPage />} />
          {/* <Route path="users" element={<UsersPage />} /> */}
          {/* <Route path="users/:notClientUsers" element={<NotUsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
