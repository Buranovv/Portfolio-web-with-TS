import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button, Layout, Menu, Modal, theme } from "antd";

import {
  // DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { TOKEN, USER } from "../../constants";
const { Header, Sider, Content } = Layout;
import Cookies from "js-cookie";

import "./clientLayout.scss";

const ClientLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit",
      onOk: () => {
        navigate("/login");
        localStorage.removeItem(USER);
        Cookies.remove(TOKEN);
      },
    });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="aside-logo">{collapsed ? "LMS" : "LMS admin"}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            // {
            //   key: "/dashboard",
            //   icon: <DashboardOutlined />,
            //   label: <Link to="/dashboard">Dashboard</Link>,
            // },
            {
              key: "educationPage",
              icon: <TeamOutlined />,
              label: <Link to="educationPage">Categories</Link>,
            },
            {
              key: "/skillsPage",
              icon: <TeamOutlined />,
              label: <Link to="/skillsPage">Products</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: logout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
