import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import Search from "antd/es/input/Search";

import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { LIMIT } from "../../../constants";
import { getUserPhoto } from "../../../utils";
import useAuth from "../../../zustand/auth";
import useUsers from "../../../zustand/user";

const UsersPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const {
    allData,
    loading,
    page,
    total,
    selected,
    search,
    isModalOpen,
    isModalLoad,
    closeModal,
    showModal,
    getAllData,
    addData,
    getSingleData,
    updateData,
    deleteData,
    handleSearch,
    setPage,
  } = useUsers();
  const { clientID } = useAuth();

  useEffect(() => {
    getAllData(search, page, clientID);
  }, [getAllData, search, page, clientID]);

  const handleOk = async () => {
    const values = await form.validateFields();
    if (selected === null) {
      addData(values, clientID);
    } else {
      updateData(values, selected, clientID);
    }
  };

  const handleEdit = async (id: string) => getSingleData(id, form);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        deleteData(id, clientID);
      },
    });
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <Image style={{ width: "50px" }} src={getUserPhoto(photo)} />
      ),
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(id)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(id)}
            danger
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex align="center" justify="space-between">
            <h2>Users ({total})</h2>
            <Form
              name="UserSearch"
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: 400,
              }}
              autoComplete="off"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Search
                  onChange={(e)=>handleSearch(e, pathname, navigate)}
                  placeholder="search..."
                  allowClear
                />
              </Space.Compact>
            </Form>
            <Button
              type="dashed"
              onClick={() => showModal(form)}
              icon={<UserAddOutlined />}
            >
              Add user
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={allData}
        columns={columns}
        pagination={false}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page, pathname, navigate)}
        />
      ) : null}
      <Modal
        title="User data"
        okText={selected === null ? "Add" : "Save"}
        okButtonProps={{
          icon: selected === null ? <UserAddOutlined /> : <SaveOutlined />,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        maskClosable={false}
        confirmLoading={isModalLoad}
      >
        <Form
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{ level: "low" }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          ) : null}

          <Form.Item label="Role" name="role">
            <Select
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "user", label: "User" },
                { value: "client", label: "Client" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
