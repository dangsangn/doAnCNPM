import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import "./style.scss";

function ProductItem({ data }) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  const { count_purchased, price, link_image, name, rating, discount, id } =
    data;
    console.log(data);
    return (
      <Link to={"/productItem/" + id} className="productItem" href="#1">
        <div className="productItem__img">
          <img src={link_image} alt="imageProduct" />
          <div></div>
        </div>
        <div className="productItem__content">
          <p className="productItem__description text-clamp text-clamp--3">
            {name}
          </p>
          <div>
            {rating > 0 && <Rate disabled defaultValue={rating} />}
            <div className="productItem__bottom">
              <span className="productItem__bottom-price">
                {discount >= 0
                  ? formatter.format(price - discount)
                  : formatter.format(price)}
              </span>
              <span className="productItem__bottom-quantity">
                Đã bán {count_purchased}
              </span>
            </div>
          </div>
        </div>

        <div className="productItem__discout">
          <span>
            {discount >= 0 ? Number.parseInt((discount / price) * 100) : 0}%
          </span>
          <br></br>
          <span>GIẢM</span>
        </div>
      </Link>
    );
}

export default ProductItem;
