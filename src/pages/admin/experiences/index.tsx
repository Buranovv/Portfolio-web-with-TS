import { Fragment, useEffect } from "react";

import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
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
import useExperience from "../../../zustand/experience";

const ExperiencesPage = () => {
  const [form] = Form.useForm();

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
  } = useExperience();

  useEffect(() => {
    getAllData(search, page);
  }, [getAllData, search, page]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.startDate = new Date(values.startDate).toISOString();
    values.endDate = new Date(values.endDate).toISOString();
    if (selected === null) {
      addData(values);
    } else {
      updateData(values, selected);
    }
  };

  const handleEdit = async (id: string) => getSingleData(id, form);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        deleteData(id);
      },
    });
  };

  const columns = [
    {
      title: "Work name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company nam",
      dataIndex: "companyName",
      key: "companyName",
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
            <h2>Experiences ({total})</h2>
            <Form
              name="experienceSearch"
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
                  onChange={handleSearch}
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
              Add experiences
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
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Experience data"
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
          name="experience"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Work name"
            name="workName"
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
            label="Company name"
            name="companyName"
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

export default ExperiencesPage;
