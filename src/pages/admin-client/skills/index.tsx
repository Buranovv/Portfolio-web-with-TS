import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import UniversalData from "../../../types/universalData";
import useAuth from "../../../zustand/auth";
import useSkill from "../../../zustand/skill";

const SkillsPage = () => {
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
  } = useSkill();
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
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Fullname",
      render: (_: string, row: UniversalData) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
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
            <h2>Skills ({total})</h2>
            <Form
              name="skillSearch"
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
              Add skill
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
        title="Teacher data"
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
          name="skills"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            isMarried: false,
          }}
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

          <Form.Item
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
