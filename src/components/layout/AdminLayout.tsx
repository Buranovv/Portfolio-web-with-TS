import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Button, Layout, Menu, theme } from "antd";

import {
  // DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // TeamOutlined,
} from "@ant-design/icons";
// import { TOKEN } from "../../const";
const { Header, Sider, Content } = Layout;
import "./adminLayout.scss";

const AdminLayout = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const logout = () => {
  //   Modal.confirm({
  //     title: "Do you want to exit",
  //     onOk: () => {
  //       navigate("/login");
  //       localStorage.removeItem(TOKEN);
  //     },
  //   });
  // };

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
            // {
            //   key: "/category",
            //   icon: <TeamOutlined />,
            //   label: <Link to="/category">Categories</Link>,
            // },
            // {
            //   key: "/product",
            //   icon: <TeamOutlined />,
            //   label: <Link to="/product">Products</Link>,
            // },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
              // onClick: logout,
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

export default AdminLayout;
