import { useNavigate } from "react-router-dom";

import { Button, Result } from "antd";

import useAuth from "../../../zustand/auth";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { isAuth, role } = useAuth();

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() =>
              navigate(
                isAuth && (role === "admin" || role === "client")
                  ? "/dashboard"
                  : "/"
              )
            }
          >
            Back{" "}
            {isAuth &&
              (role === "admin" || role === "client" ? "Dashboard" : "Main")}
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
