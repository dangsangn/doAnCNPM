import { Button, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import React from "react";
import userAPI from "../../../api/userAPI";

UpdatePassword.propTypes = {
  onSubmit: PropTypes.func,
};

UpdatePassword.defaultProps = {
  onSubmit: null,
};

function UpdatePassword(props) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const res = await userAPI.updatePassword(values);
      if (res.status === 204) {
        message.success("Update password success");
        form.resetFields();
      }
    } catch (error) {
      message.error("Update password error");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <div className="user-profile">
      <h2>Thông tin tài khoản</h2>
      <div className="user-profile__container">
        <Form
          form={form}
          name="updatePassword"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Current password"
            name="current_password"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password Confirmation"
            name="password_confirmation"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            dependencies={["password"]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePassword;
