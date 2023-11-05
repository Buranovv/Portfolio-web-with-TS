import { Fragment, useEffect } from "react";

import {
  Flex,
  Form,
  Image,
  Modal,
  Pagination,
  Space,
  Switch,
  Table,
} from "antd";
import Search from "antd/es/input/Search";

import { LIMIT } from "../../../constants";
import { getUserPhoto } from "../../../utils";
import useGetNotClientUsers from "../../../zustand/notClientUser";

const NotUsersPage = () => {
  const [form] = Form.useForm();

  const {
    users,
    loading,
    total,
    page,
    search,
    getAll,
    confirmUserToClient,
    handleSearch,
    setPage,
  } = useGetNotClientUsers();

  useEffect(() => {
    getAll(search, page);
  }, [getAll, search, page]);

  const confirmClient = (id: string) => {
    Modal.confirm({
      title: "Do you want to confirm to client?",
      onOk: async () => {
        confirmUserToClient(id);
      },
      onCancel: () => {
        form.resetFields();
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
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Form
            name="notClient"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            form={form}
          >
            <Form.Item name="switch">
              <Switch onChange={() => confirmClient(id)} />
            </Form.Item>
          </Form>
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
              name="notClientSearch"
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
                  onChange={(e) => handleSearch(e)}
                  placeholder="search..."
                  allowClear
                />
              </Space.Compact>
            </Form>
          </Flex>
        )}
        loading={loading}
        dataSource={users}
        columns={columns}
        pagination={false}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
    </Fragment>
  );
};

export default NotUsersPage;
