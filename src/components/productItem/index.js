import React from "react";
import { Link } from "react-router-dom";

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
  const { title, price, image, rating, discount, id, soldQuantity } = props;
  return (
    <Link to={"/productItem/" + id} className="productItem" href="#1">
      <div className="productItem__img">
        <img src={image} alt="imageProduct" />
        <div></div>
      </div>

      <div className="productItem__content">
        <p className="productItem__description">{title}</p>
        <p className="productItem__rating">{showRating(rating)}</p>
        <div className="productItem__bottom">
          <span className="productItem__bottom-price">
            {price} <ins>đ</ins>
          </span>
          <span className="productItem__bottom-quantity">
            Đã bán {soldQuantity}
          </span>
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
