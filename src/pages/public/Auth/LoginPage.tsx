import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Form, Input, message } from "antd";

import Cookies from "js-cookie";

import { TOKEN, USER } from "../../../constants";
import { AuthContext } from "../../../context/Auth";
import request from "../../../server/request";

interface FieldType {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const { setIsAuth, setUser } = useContext(AuthContext);

  const onFinish = async (values: FieldType) => {
    try {
      setLoad(true);
      const {
        data: {
          token,
          user: { role },
        },
      } = await request.post<{ token: string; user: { role: string } }>(
        "auth/login",
        values
      );
      setIsAuth(true);
      setUser(role);
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(role));
      if (role === "client") {
        navigate("/myPortfolios");
      } else if (role === "user") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
      message.success("Successfully logged in");
    } catch (error) {
      message.error("Error");
    } finally {
      setLoad(false);
    }
  };

  return (
    <Flex
      style={{ height: "calc(100vh - 252px)" }}
      justify="center"
      align="center"
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ width: 500 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" loading={load}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
