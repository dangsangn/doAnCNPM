import { FastField, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";
import userAPI from "../../api/userAPI";
import UpdatePassword from "../updatePassword";
import InputField from "./../../custom-fields/InputField";
import * as toastMessage from "./../../helpers/toastMessage";
import "./style.css";

UserProfile.propTypes = {
  onSubmit: PropTypes.func,
};

UserProfile.defaultProps = {
  onSubmit: null,
};

function UserProfile(props) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    phoneNumber: Yup.string().required("This field is required."),
    email: Yup.string().required("This field is required."),
    gender: Yup.string().required("This field is required."),
  });

  const userProfile = useSelector((state) => state.user);
  console.log(userProfile);

  let initialValues = {
    firstName: userProfile.first_name,
    lastName: userProfile.last_name,
    phoneNumber: userProfile.phone_number,
    email: userProfile.email,
    gender: userProfile.gender,
    birthday: userProfile.date_of_birth,
  };
  console.log(initialValues);

  const handleSubmit = async (value) => {
    try {
      const data = {
        first_name: value.firstName,
        last_name: value.lastName,
        phone_number: value.phoneNumber,
        email: value.email,
        gender: value.gender,
        date_of_birth: value.birthday,
      };
      await userAPI.updateProfile(data);
      toastMessage.toastSucces("Updated success");
    } catch (error) {
      console.log(error);
      toastMessage.toastError("Error updating profile");
    }
  };

  return (
    <div className="user-profile">
      <h2>Thông tin tài khoản</h2>
      <div className="user-profile__container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            // do something here ...
            //const { values, errors, touched, isSubmitting } = formikProps;
            const { isSubmitting } = formikProps;

            return (
              <Form>
                <FastField
                  name="firstName"
                  type="text"
                  component={InputField}
                  label="First name"
                  placeholder="Enter first name ..."
                />

                <FastField
                  name="lastName"
                  type="text"
                  component={InputField}
                  label="Last name"
                  placeholder="Enter last name ..."
                />

                <FastField
                  name="phoneNumber"
                  type="text"
                  component={InputField}
                  label="Số điện thoại"
                  placeholder="Enter number phone ..."
                />
                <FastField
                  name="email"
                  type="email"
                  component={InputField}
                  label="Email"
                  placeholder="Email"
                  disabled={true}
                />

                <div id="my-radio-group">Giới tính</div>
                <div
                  class="radio-pick"
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  <label>
                    <Field type="radio" name="gender" value="nam" />
                    Nam
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="nu" />
                    Nữ
                  </label>
                </div>
                <FastField
                  name="birthday"
                  type="text"
                  component={InputField}
                  label="Ngày sinh
                    (không bắt buộc)"
                  placeholder="Ngày sinh"
                />
                <FormGroup>
                  <Button type="submit" color={"primary"}>
                    {isSubmitting && <Spinner size="sm" />}
                    Cập nhật
                  </Button>
                </FormGroup>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="user-profile__update-password mt-50">
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Update password
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
