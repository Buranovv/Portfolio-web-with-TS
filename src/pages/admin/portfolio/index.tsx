import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Flex,
  Form,
  Image,
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
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { LIMIT } from "../../../constants";
import PhotoData from "../../../types/photo";
import { getPhoto } from "../../../utils";
import usePortfolio from "../../../zustand/portfolio";

const PortfolioPage = () => {
  const [form] = Form.useForm();

  const {
    allData,
    loading,
    page,
    total,
    selected,
    photo,
    photoLoad,
    uploadPhoto,
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
  } = usePortfolio();

  useEffect(() => {
    getAllData(search, page);
  }, [getAllData, search, page]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = photo?._id;
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

  const choosePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = new FormData();
    file.append(
      "file",
      e.target.files instanceof FileList ? e.target.files[0] : ""
    );
    uploadPhoto(file);
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo: PhotoData) => (
        <Image style={{ width: "50px" }} src={getPhoto(photo)} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Web-site",
      dataIndex: "url",
      key: "project",
      render: (url: string) => (
        <Link target="_blank" to={url}>
          project
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            <h2>Portfolios ({total})</h2>
            <Form
              name="portfolioSearch"
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
            <Button
              type="dashed"
              onClick={() => showModal(form)}
              icon={<UserAddOutlined />}
            >
              Add portfolio
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
        title="Portfolio data"
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
          name="portfolio"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item name="photo">
            <div
              className="img-box"
              style={{
                width: "100%",
                height: "250px",
                border: "1px dashed black",
              }}
            >
              <label
                htmlFor="photo"
                style={{
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {photoLoad ? (
                  <LoadingOutlined />
                ) : photo ? (
                  <img
                    src={getPhoto(photo)}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PlusOutlined />
                    <div>upload</div>
                  </div>
                )}
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                style={{ display: "none" }}
                onChange={(e) => choosePhoto(e)}
              />
            </div>
          </Form.Item>

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
            label="Url"
            name="url"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfolioPage;
