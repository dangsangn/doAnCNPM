import { Button, Form, Input, message, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAReview, getReviewOfProduct } from "../../../actions/review";
import ReviewItem from "./review-item";
import "./review.scss";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

function showListReview(list) {
  let result = null;
  if (list.length > 0) {
    result = list.map((item) => {
      return <ReviewItem key={item.id} data={item} />;
    });
  }
  return result;
}

function Review(props) {
  const review = useSelector((state) => state.review);
  const user = useSelector((state) => state.user);
  const [rating, setRating] = useState(3);
  const { dataProduct } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getReviewOfProduct(dataProduct.id));
  }, [dispatch, dataProduct]);

  const handleChange = (value) => {
    setRating(value);
  };

  const onFinish = (values) => {
    if (user.isLogin) {
      dispatch(addAReview({ ...values, product_id: dataProduct.id }));
      form.resetFields();
    } else {
      message.warning("Please login!");
    }
  };

  return (
    <div className="review">
      <div className="grid wide">
        <div className="review__container">
          <h3 className="review__title">Đánh giá sản phẩm</h3>
          <div className="review__content">
            <div className="row">
              <div className="col l-6">
                <div className="review__show">
                  {review.length > 0 ? (
                    showListReview(review)
                  ) : (
                    <h3>No have review.</h3>
                  )}
                </div>
              </div>
              <div className="col l-6">
                <h3 style={{ textAlign: "center" }}>Leave your review</h3>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  form={form}
                >
                  <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[
                      {
                        required: true,
                        message: "Please input your rating!",
                      },
                    ]}
                  >
                    <Rate
                      tooltips={desc}
                      onChange={handleChange}
                      value={rating}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Commnet"
                    name="comment"
                    rules={[
                      {
                        required: true,
                        message: "Please input your comment!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
