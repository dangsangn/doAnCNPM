import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";
import userAPI from "../../api/userAPI";
import InputField from "./../../custom-fields/InputField";
import * as toastMessage from "./../../helpers/toastMessage";

UpdatePassword.propTypes = {
  onSubmit: PropTypes.func,
};

UpdatePassword.defaultProps = {
  onSubmit: null,
};

function UpdatePassword(props) {
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("This field is required."),
    newPassword: Yup.string().required("This field is required."),
    confirmPassword: Yup.string().required("This field is required."),
  });

  let initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (value) => {
    try {
      const data = {
        current_password: value.password,
        password: value.newPassword,
        password_confirmation: value.confirmPassword,
      };
      const response = await userAPI.updatePassword(data);
      console.log(response);
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
                  name="password"
                  type="password"
                  component={InputField}
                  label="Current password: "
                  placeholder="Enter current password.."
                />

                <FastField
                  name="newPassword"
                  type="password"
                  component={InputField}
                  label="New password"
                  placeholder="Enter New password ..."
                />

                <FastField
                  name="confirmPassword"
                  type="password"
                  component={InputField}
                  label="Confirm password"
                  placeholder="Enter Confirm password ..."
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
    </div>
  );
}

export default UpdatePassword;
