import { Button, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUserSuccess } from "../../actions/userAction";
import userAPI from "../../api/userAPI";
import "./style.css";

UserAddress.propTypes = {
  onSubmit: PropTypes.func,
};

UserAddress.defaultProps = {
  onSubmit: null,
};

function UserAddress(props) {
  const userProfile = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [checkedEdit, setCheckedEdit] = useState(false);

  const onFinish = async (values) => {
    try {
      const res = await userAPI.updateProfile(values);
      if (res.status === 200) {
        dispatch(getProfileUserSuccess(res.data));
        message.success("Updated success");
      } else {
        message.warning("Updated error");
      }
    } catch (error) {
      console.error(error);
    }

    setCheckedEdit(false);
  };

  return (
    <div className="user-address">
      <h2>Sổ địa chỉ</h2>
      <div className="user-address__container">
        <p className="user-address__name">
          {userProfile.first_name
            ? userProfile.first_name + " " + userProfile.last_name
            : userProfile.email}
          <span>
            <i className="fa fa-check-circle-o" aria-hidden="true"></i> Địa chỉ
            mặc định
          </span>
        </p>
        <p className="user-address__address">
          <span>Địa chỉ: </span>
          {userProfile.address || "No have address"}
        </p>
        <p className="user-address__phone">
          <span>Điện thoại: </span>
          {userProfile.phone_number || "No have phone"}
        </p>
      </div>

      <label className="label-checkbox" htmlFor="form-edit-address">
        Chỉnh sửa địa chỉ{" "}
        {checkedEdit ? (
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        )}
      </label>
      <input
        type="checkbox"
        id="form-edit-address"
        onChange={(event) => setCheckedEdit(event.target.checked)}
        checked={checkedEdit}
      />
      <div id="user-address__edit" className="user-address__edit">
        <Form
          name="updateAddress"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="New Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UserAddress;
