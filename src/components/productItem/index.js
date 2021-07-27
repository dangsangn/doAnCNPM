import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function showRating(rating) {
  const result = [];
  if (rating === 0) return result;
  for (let i = 0; i < rating; i++) {
    result.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);
  }
  for (let i = rating; i < 5; i++) {
    result.push(<i className="fa fa-star-o" aria-hidden="true" key={i}></i>);
  }
  return result;
}

function ProductItem(props) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  const { title, price, image, rating, discount, id, soldQuantity } = props;
  return (
    <Link to={"/productItem/" + id} className="productItem" href="#1">
      <div className="productItem__img">
        <img src={image} alt="imageProduct" />
        <div></div>
      </div>
      <div className="productItem__content">
        <p className="productItem__description text-clamp text-clamp--3">
          {title}
        </p>
        <div>
          <p className="productItem__rating">{showRating(rating)}</p>
          <div className="productItem__bottom">
            <span className="productItem__bottom-price">
              {formatter.format(price)}
            </span>
            <span className="productItem__bottom-quantity">
              Đã bán {soldQuantity}
            </span>
          </div>
        </div>
      </div>

      <div className="productItem__discout">
        <span>{discount}%</span>
        <br></br>
        <span>GIẢM</span>
      </div>
    </Link>
  );
}

export default ProductItem;
