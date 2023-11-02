import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FrontLayout from "./components/layout/fronLayout/FrontLayout";
import { AuthContext } from "./context/Auth";
import LoginPage from "./pages/public/Auth/LoginPage";
import RegisterPage from "./pages/public/Auth/RegisterPage";
import EducationPage from "./pages/public/education/EducationPage";
import HomePage from "./pages/public/home/HomePage";
import SkillsPage from "./pages/public/skills/SkillsPage";

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          {isAuth ? (
            <Fragment>
              <Route path="skillsPage" element={<SkillsPage />} />
              <Route path="educationPage" element={<EducationPage />} />
            </Fragment>
          ) : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
