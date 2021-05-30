import InputField from "./../../custom-fields/InputField";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";

import * as Yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

function RegisterForm(props) {
  const { initialValues } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    password: Yup.string().required("This field is required."),
    email: Yup.string().required("This field is required."),
    passwordConfirm: Yup.string().required("This field is required."),
  });

  // npm i --save react-select
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        // do something here ...
        //const { values, errors, touched, isSubmitting } = formikProps;
        const { isSubmitting } = formikProps;

        return (
          <Form>
            <FastField
              name="name"
              type="text"
              component={InputField}
              label="Username"
              placeholder="Enter username ..."
            />

            <FastField
              name="email"
              type="text"
              component={InputField}
              label="Your email"
              placeholder="Enter email ..."
            />

            <FastField
              name="password"
              type="password"
              component={InputField}
              label="password"
              placeholder="Enter password ..."
            />

            <FastField
              name="passwordConfirm"
              type="password"
              component={InputField}
              label="Confirm Password"
              placeholder="Confirm password ..."
            />

            <FormGroup>
              <Button type="submit" color={"primary"}>
                {isSubmitting && <Spinner size="sm" />}
                Register
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
