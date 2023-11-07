import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Loader2 from "../../../components/shared/loader/Loader2";
import Universal from "../../../types/universal";
import useAuth from "../../../zustand/auth";

import "./style.scss";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Universal>({
    mode: "onTouched",
  });

  const { login, loading } = useAuth();

  const submit = (values: object) => {
    login(values, navigate);
  };

  return (
    <Fragment>
      {loading ? <Loader2 /> : null}
      <div className="loginRegister-body">
        <div className="forBg"></div>
        <div className="form_block">
          <div className="content">
            <h2>Welcome</h2>
            <p>Login with Username</p>
          </div>
          <form onSubmit={handleSubmit(submit)} className="loginForm">
            <div>
              <input
                type="text"
                {...register("username", {
                  required: "This field must not be empty!",
                })}
                required={true}
                style={{
                  border: `solid ${errors.username ? "red" : "#889195"}`,
                }}
                className="usernameInput"
              />
              <span className="usernameSpan">Username</span>
              {errors.username ? (
                <p style={{ color: "red" }}>{`${errors?.username.message}`}</p>
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 7 7"
                fill="none"
                className="userSvg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.78968 1.51114C3.25848 1.51114 2.82822 1.95623 2.82822 2.50576C2.82822 3.05528 3.25848 3.50038 3.78968 3.50038C4.32089 3.50038 4.75115 3.05528 4.75115 2.50576C4.75115 1.95623 4.32089 1.51114 3.78968 1.51114ZM4.27042 2.50576C4.27042 2.23224 4.05409 2.00845 3.78968 2.00845C3.52528 2.00845 3.30895 2.23224 3.30895 2.50576C3.30895 2.77928 3.52528 3.00307 3.78968 3.00307C4.05409 3.00307 4.27042 2.77928 4.27042 2.50576ZM5.23188 4.99231C5.18381 4.81576 4.43868 4.495 3.78969 4.495C3.1431 4.495 2.40277 4.81328 2.34749 4.99231H5.23188ZM1.86674 4.9923C1.86674 4.33088 3.1479 3.99768 3.78967 3.99768C4.43145 3.99768 5.7126 4.33088 5.7126 4.9923V5.48961H1.86674V4.9923Z"
                  fill="#889195"
                />
              </svg>
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Please enter the password!",
                  minLength: {
                    value: 5,
                    message: "The password`s minimal length must be 5!",
                  },
                })}
                style={{
                  border: `solid ${errors.password ? "red" : "#889195"}`,
                }}
                required={true}
                className="passwordInput"
              />
              <span className="passwordSpan">Password</span>
              {errors.password ? (
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              ) : null}
              <div className="passwordSvg">
                <EyeOutlined
                  style={{ display: `${showPassword ? "block" : "none"}` }}
                  onClick={() => setShowPassword(false)}
                />
                <EyeInvisibleOutlined
                  style={{ display: `${showPassword ? "none" : "block"}` }}
                  onClick={() => setShowPassword(true)}
                />
              </div>
            </div>
            <Link to="/auth/login" className="forgotPassword">
              Forgot password?
            </Link>
            <button type="submit" className="loginSubmit">
              Login
            </button>
          </form>
          <div className="or">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div className="authWith">
            <Link to="/auth/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="95"
                height="54"
                viewBox="0 0 95 54"
                fill="none"
              >
                <rect width="95" height="54" rx="9" fill="#E7F2F5" />
                <path
                  d="M59.5147 27.2731C59.5161 26.456 59.4466 25.6404 59.3068 24.8353H47.9973V29.4551H54.4775C54.3445 30.1933 54.0633 30.8969 53.6509 31.5235C53.2385 32.1501 52.7035 32.6866 52.078 33.1006V36.0984H55.9443C57.124 34.9592 58.0513 33.585 58.6664 32.0648C59.2814 30.5445 59.5704 28.9121 59.5147 27.2731Z"
                  fill="#009EE2"
                />
                <path
                  d="M47.9939 38.9955C50.9166 39.0773 53.7605 38.0412 55.9457 36.0985L52.0794 33.1008C51.1484 33.6967 50.0939 34.0727 48.9959 34.2002C47.898 34.3277 46.7854 34.2035 45.7426 33.8368C44.6998 33.4701 43.7543 32.8707 42.9778 32.0841C42.2012 31.2974 41.6141 30.3442 41.261 29.2968H37.2763V32.3873C38.275 34.3737 39.806 36.0435 41.6985 37.2104C43.591 38.3772 45.7706 38.9952 47.9939 38.9955Z"
                  fill="#34A853"
                />
                <path
                  d="M41.2609 29.2924C40.7585 27.8028 40.7585 26.1895 41.2609 24.6998V21.6141H37.2762C36.437 23.2858 36 25.1304 36 27.0009C36 28.8714 36.437 30.716 37.2762 32.3877L41.2609 29.2924Z"
                  fill="#FBBC04"
                />
                <path
                  d="M47.9939 19.7486C49.7044 19.7208 51.3574 20.3666 52.596 21.5466L56.0241 18.1218C53.8511 16.0829 50.9733 14.9645 47.9939 15.0009C45.7701 15.0015 43.5902 15.6203 41.6976 16.788C39.8051 17.9557 38.2743 19.6265 37.2763 21.6138L41.261 24.7043C41.7248 23.2784 42.6236 22.0336 43.8312 21.1447C45.0388 20.2559 46.4945 19.7676 47.9939 19.7486Z"
                  fill="#EA4335"
                />
              </svg>
            </Link>
            <Link to="/auth/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="95"
                height="54"
                viewBox="0 0 95 54"
                fill="none"
              >
                <rect width="95" height="54" rx="9" fill="#E7F2F5" />
                <path
                  d="M59.007 27.0004C59.0064 24.7065 58.3486 22.4609 57.1114 20.5293C55.8741 18.5977 54.1093 17.061 52.0259 16.1012C49.9425 15.1414 47.6276 14.7987 45.3555 15.1137C43.0833 15.4286 40.949 16.388 39.2052 17.8783C37.4613 19.3685 36.181 21.3273 35.5158 23.5226C34.8506 25.7179 34.8283 28.0578 35.4517 30.2654C36.075 32.4729 37.3178 34.4556 39.033 35.9788C40.7482 37.502 42.8639 38.5018 45.1296 38.8599V30.4681H42.0834V27.0004H45.1283V24.357C45.0629 23.7394 45.1342 23.115 45.337 22.5281C45.5398 21.9411 45.8693 21.406 46.302 20.9605C46.7347 20.5151 47.2601 20.1703 47.8409 19.9505C48.4217 19.7308 49.0438 19.6415 49.663 19.6889C50.5643 19.7017 51.4635 19.7811 52.3531 19.9263V22.8792H50.838C50.5803 22.8452 50.3182 22.8695 50.0712 22.9504C49.8241 23.0314 49.5985 23.1668 49.4109 23.3467C49.2232 23.5267 49.0785 23.7465 48.9873 23.9899C48.8961 24.2334 48.8608 24.4942 48.8841 24.7531V27.0004H52.2184L51.6849 30.4681H48.8841V38.8546C51.7062 38.4069 54.276 36.9672 56.1316 34.7943C57.9872 32.6214 59.0068 29.8578 59.007 27.0004Z"
                  fill="#009EE2"
                />
                <path
                  d="M51.6797 30.4734L52.2132 27.0057H48.8789V24.7544C48.8557 24.4955 48.891 24.2346 48.9822 23.9912C49.0733 23.7478 49.2181 23.528 49.4057 23.348C49.5933 23.1681 49.819 23.0326 50.066 22.9517C50.313 22.8708 50.5751 22.8464 50.8328 22.8805H52.3466V19.9276C51.457 19.7824 50.5578 19.703 49.6565 19.6902C49.0373 19.6427 48.4152 19.7321 47.8344 19.9518C47.2536 20.1716 46.7282 20.5164 46.2955 20.9618C45.8628 21.4072 45.5333 21.9424 45.3305 22.5293C45.1277 23.1163 45.0564 23.7407 45.1218 24.3582V27.0017H42.0769V30.4694H45.1218V38.8558C45.7416 38.9538 46.3682 39.002 46.9957 38.9999C47.6235 38.9987 48.2503 38.9506 48.8709 38.8558V30.4694L51.6797 30.4734Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link to="/auth/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="95"
                height="54"
                viewBox="0 0 95 54"
                fill="none"
              >
                <rect width="95" height="54" rx="9" fill="#E7F2F5" />
                <path
                  d="M53.8649 27.6808C53.8424 26.7481 54.0812 25.8277 54.5542 25.0235C55.0273 24.2193 55.7157 23.5635 56.5419 23.1299C56.0217 22.4076 55.3411 21.8158 54.5535 21.401C53.766 20.9862 52.8929 20.7598 52.0031 20.7394C50.1011 20.5895 48.0211 21.849 47.2608 21.849C46.4577 21.849 44.6133 20.793 43.1664 20.793C40.1789 20.8478 37 23.1848 37 27.9378C37.014 29.4211 37.275 30.8917 37.7723 32.2892C38.4576 34.2568 40.9338 39.0793 43.5171 38.999C44.8676 38.9669 45.8219 38.0393 47.5794 38.0393C49.2833 38.0393 50.168 38.999 51.6738 38.999C54.2785 38.9615 56.5191 34.582 57.1723 32.6051C56.1938 32.206 55.3566 31.5241 54.7677 30.6467C54.1788 29.7693 53.8649 28.7362 53.8662 27.6795L53.8649 27.6808ZM50.8319 18.8816C51.3052 18.3601 51.6642 17.7454 51.8857 17.0769C52.1072 16.4084 52.1864 15.7009 52.1182 15C50.7144 15.1509 49.4171 15.8189 48.4788 16.8739C47.9992 17.3868 47.63 17.9928 47.3942 18.6543C47.1585 19.3158 47.0611 20.0187 47.1082 20.7193C47.8311 20.7347 48.547 20.5757 49.1954 20.2558C49.8438 19.9359 50.4056 19.4646 50.8332 18.8816H50.8319Z"
                  fill="black"
                />
              </svg>
            </Link>
          </div>
          <div className="switchAuth">
            <p>Dont't have account?</p>
            <Link to="/auth/register">Register Now</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
