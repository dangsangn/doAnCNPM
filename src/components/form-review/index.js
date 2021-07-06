import { FastField, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";
import reviewAPI from "../../api/reviewAPI";
import InputField from "./../../custom-fields/InputField";
import * as toastMessage from "./../../helpers/toastMessage";

FormReview.propTypes = {
  onSubmit: PropTypes.func,
};

FormReview.defaultProps = {
  onSubmit: null,
};

function FormReview(props) {
  const id = props.id;
  const validationSchema = Yup.object().shape({
    comment: Yup.string().required("This field is required."),
    rating: Yup.string().required("This field is required."),
  });

  let initialValues = {
    comment: "",
    rating: 0,
    photo: "",
  };

  const handleSubmit = async (value) => {
    //console.log(photos);
    try {
      // const data = {
      //   comment: value.comment,
      //   rating: value.rating,
      //   product_id: -(-id),
      //   // photo_urls: [value.photo],
      // };
      let data = new FormData();
      let photo = document.querySelector('input[type = "file"]').files[0];
      console.log(photo);
      data.append("comment", value.comment);
      data.append("rating", value.rating);
      data.append("product_id", -(-id));
      data.append("photo_urls[]", photo);
      const response = await reviewAPI.postReview(data);
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
                  name="comment"
                  type="text"
                  component={InputField}
                  label="Comment: "
                  placeholder="Enter comment ..."
                />
                <label>Start Number: </label>
                <br></br>
                <Field name="rating" type="number" min={0} max={5} />

                <div id="my-radio-group">Chọn ảnh: </div>
                <Field type="file" name="photo" />
                <br></br>
                <br></br>
                <FormGroup>
                  <Button type="submit" color={"primary"}>
                    {isSubmitting && <Spinner size="sm" />}
                    Gửi
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

export default FormReview;
