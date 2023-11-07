import { useNavigate } from "react-router-dom";

import useAuth from "../../../zustand/auth";

import "./style.scss";

const WaitPage = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  return (
    <div className="waitPage">
      <h1>Please wait until admin confirm you to client</h1>
      <button className="waitLogout" onClick={() => logout(navigate)}>
        Logout
      </button>
    </div>
  );
};

export default WaitPage;
