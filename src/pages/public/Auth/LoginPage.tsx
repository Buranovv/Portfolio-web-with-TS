import { Button, Flex, Form, Input } from "antd";

interface FieldType {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const onFinish = (values: FieldType) => {
    console.log(values);
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
