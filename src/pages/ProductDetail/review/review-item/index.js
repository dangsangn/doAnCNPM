import React from "react";
import "./reviewItem.css";
import { Rate } from "antd";
import { formatTime } from "../../../../helpers/formatTime";

function ReviewItem(props) {
  const { comment, create_at, rating, reviewer_name } = props.data;
  return (
    <div className="review__item">
      <div className="row">
        <div className="col l-2">
          <div className="review__item__img">
            <img
              src="https://cf.shopee.vn/file/3a37603246930ccafbf254f66a00bd39_tn"
              alt="imageAuth"
            />
          </div>
        </div>
        <div className="col l-10">
          <div className="review__item__content">
            <p className="review__item__name">{reviewer_name}</p>
            <div className="review__item__rating">
              <Rate disabled value={rating} />
            </div>
            <p className="review__item__desc">{comment}</p>
            <p className="review__item__time">{formatTime(create_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
