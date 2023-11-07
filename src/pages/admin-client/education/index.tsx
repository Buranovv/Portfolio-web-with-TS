import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Flex,
  Form,
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
import Universal from "../../../types/universal";
import useAuth from "../../../zustand/auth";
import useEducation from "../../../zustand/education";

const EducationPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
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
  } = useEducation();
  const { clientID } = useAuth();

  useEffect(() => {
    getAllData(search, page, clientID);
  }, [getAllData, search, page, clientID]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.startDate = new Date(values.startDate).toISOString();
    values.endDate = new Date(values.endDate).toISOString();
    if (selected === null) {
      addData(values, clientID);
    } else {
      updateData(values, selected, clientID);
    }
  };

  const handleEdit = (id: string) => getSingleData(id, form);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => <p>{data.slice(0, 30)}</p>,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: Universal) =>
        `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
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
            <h2>Educations ({total})</h2>
            <Form
              name="educationSearch"
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
                  value={search}
                  onChange={(e) => handleSearch(e, pathname, navigate)}
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
              Add education
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
        title="Education data"
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
          name="education"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="level">
            <Select
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "high", label: "High" },
                { value: "middle", label: "Middle" },
                { value: "low", label: "Low" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
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
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="End date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
