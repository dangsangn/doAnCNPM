import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypesCart from "../../../actions/cartAction";
import { Popconfirm } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { formatter } from "../../../helpers/formatToPriceMoney";

function CartItem(props) {
  const dispatch = useDispatch();
  const { id, name, price, link_image, count } = props.data;
  const [checkBought, setCheckBought] = useState(false);
  const [quantityItem, setQuantityItem] = useState(count);

  const handelChangeProduct = (value) => {
    setQuantityItem(quantityItem + value);
    dispatch(
      actionTypesCart.updateProductToCart({
        ...props.data,
        count: count + value,
      })
    );
  };

  const handleDeleteProductToCart = () => {
    dispatch(actionTypesCart.deleteProductToCart(id));
  };

  const handleCheckBought = (event) => {
    setCheckBought(event.target.checked);
    dispatch(
      actionTypesCart.isProductBought({
        id,
        isBought: event.target.checked,
      })
    );
  };

  return (
    <div className="checkout__item">
      <div className="row">
        <div className="col l-2">
          <Link to={"/"} className="checkout__item__link">
            <img src={link_image} alt={name} />
          </Link>
        </div>
        <div className="col l-6">
          <div className="checkout__item__detail">
            <a className="checkout__item__detail__name" href="#1">
              {name}
            </a>
            <p className="checkout__item__detail__amount">Chỉ còn 2 sẩn phẩm</p>
            <div className="checkout__item__detail__action">
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={handleDeleteProductToCart}
                okText="Yes"
                cancelText="No"
              >
                <span style={{ cursor: "pointer", color: "blue" }}>Delete</span>
              </Popconfirm>

              <input
                className="checkout__item__detail__action__checkbox"
                type="checkbox"
                name="checkboxBought"
                checked={checkBought}
                onChange={handleCheckBought}
                id={name}
              />
              <label
                className="checkout__item__detail__action__label"
                htmlFor={name}
              >
                Xác nhận mua
              </label>
            </div>
          </div>
        </div>
        <div className="col l-2">
          <div className="checkout__item__price">
            <p className="checkout__item__price--discount">
              {formatter.format(price - (price * 0) / 100)}
            </p>
            <span className="checkout__item__price--original">
              {formatter.format(price - (price * 0) / 100)}
            </span>
            <span className="checkout__item__price--separate"></span>
            <span className="checkout__item__discount">-{0}%</span>
          </div>
        </div>
        <div className="col l-2">
          <div className="checkout__item__action">
            <button
              disabled={quantityItem === 1 ? true : false}
              type="button"
              className={
                quantityItem === 1
                  ? "btn-disible checkout__item__action__btn-increase"
                  : "checkout__item__action__btn-increase"
              }
              onClick={() => handelChangeProduct(-1)}
            >
              -
            </button>
            <span className="checkout__item__action__display">
              {quantityItem}
            </span>
            <button
              className="checkout__item__action__btn-decrease"
              onClick={() => handelChangeProduct(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;