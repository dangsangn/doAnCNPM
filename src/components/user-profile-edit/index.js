import { Button, Form, Input, Select, DatePicker, message } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "../../api/userAPI";
import UpdatePassword from "./updatePassword";
import moment from "moment";
import "./style.scss";
import { getProfileUserSuccess } from "../../actions/userAction";
import { formatTime } from "../../helpers/formatTime";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

UserProfile.propTypes = {
  onSubmit: PropTypes.func,
};

UserProfile.defaultProps = {
  onSubmit: null,
};

function UserProfile(props) {
  const [form] = Form.useForm();
  const [dateOfBirth, setDateOfBird] = useState();
  const userProfile = useSelector((state) => state.user);
  const dateFormat = "DD / MM / YYYY";

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      phone_number: userProfile.phone_number,
      email: userProfile.email,
      gender: userProfile.gender,
      address: userProfile.address,
    });

    userProfile.date_of_birth &&
      setDateOfBird(formatTime(userProfile.date_of_birth));
  }, [userProfile, form]);

  function onChange(date, dateString) {
    setDateOfBird(dateString);
  }

  const onFinish = async (values) => {
    const data = { ...values, date_of_birth: dateOfBirth };
    try {
      const res = await userAPI.updateProfile(data);
      dispatch(getProfileUserSuccess(res.data));
      message.success("Updated success");
    } catch (error) {
      message.error("Update failure");
    }
  };

  return (
    <div className="user-profile">
      <h2>Thông tin tài khoản</h2>
      <div className="user-profile__container">
        <Form
          {...formItemLayout}
          form={form}
          name="UpdateProfile"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="first_name"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please input your first!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="nam">Male</Option>
              <Option value="nu">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <div className="ant-row ant-form-item ant-form-item-has-success">
            <div className="ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-8">
              <label>Day of Bird</label>
            </div>
            <div className="ant-col ant-form-item-label">
              {dateOfBirth ? (
                <DatePicker
                  value={moment(dateOfBirth, dateFormat)}
                  format={dateFormat}
                  onChange={onChange}
                />
              ) : (
                <DatePicker format={dateFormat} onChange={onChange} />
              )}
            </div>
          </div>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <span
              className="user-profile__update-password__btn "
              data-toggle="collapse"
              data-target="#updatePassword"
              aria-expanded="false"
              aria-controls="updatePassword"
            >
              Update password ?
            </span>
          </Form.Item>
        </Form>
      </div>
      <div className="user-profile__update-password mt-50">
        <div className="collapse" id="updatePassword">
          <div className="card card-body">
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
