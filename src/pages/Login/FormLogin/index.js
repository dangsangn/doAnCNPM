import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../actions/userAction";
import "./style.scss";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin-right: 12px;
  border-color: red;
  float: left;
`;

function LoginForm(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(userLogin(values));
    form.resetFields();
  };

  return (
    <div className="login-form">
      <Form
        name="FormLogin"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            <ClipLoader
              color={"#fff"}
              loading={loading}
              css={override}
              size={24}
            />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
