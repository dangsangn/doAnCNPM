import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import CartItem from "../cartItem";
import * as actionOrder from "./../../actions/order-actions";
import * as toastMessage from "./../../helpers/toastMessage";
import "./Cart.css";

function showCart(listCart) {
  let result = null;
  if (listCart.length > 0) {
    result = listCart.map((item) => {
      return <CartItem data={item} key={item.id} />;
    });
  }
  return result;
}

function totalPrice(listCart) {
  let result = 0;
  if (listCart.length > 0) {
    result = listCart.reduce((sum, item) => {
      if (!item.isBought) return sum;
      return (
        sum + item.price * item.count - (item.price * item.count * 50) / 100
      );
    }, 0);
  }
  return result;
}

function Cart(props) {
  const userProfile = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const handleDataOrder = (cart) => {
    let data = [];
    if (cart.length > 0) {
      data = cart.filter((item) => {
        return item.isBought;
      });
      dispatch(actionOrder.fetchListOrder(data));
    }
    if (data.length > 0) {
      history.push(`/checkout/payment`);
    } else {
      toastMessage.toastError("Please choose a product!");
    }
  };

  return (
    <div class="--container cart">
      <div class="grid wide">
        <div class="checkout">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </ol>
          </nav>

          <h2 class="checkout__header">
            Giỏ hàng{" "}
            <span class="checkout__amount-product">
              ({cart.length} sản phẩm)
            </span>
          </h2>
          <div class="row">
            <div class="col l-9">
              <div class="checkout__body">
                <nav>
                  <a href="#1" class="checkout__body__link">
                    Tiki Tranding{" "}
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </nav>
                {showCart(cart)}
              </div>
            </div>

            <div class="col l-3">
              <div class="checkout-info">
                <div class="checkout-info__user">
                  <p>
                    <span class="checkout-info__user__title">
                      Địa chỉ nhận hàng
                    </span>
                    <NavLink
                      to="/user/address"
                      class="checkout-info__user__change"
                    >
                      Thay đổi
                    </NavLink>
                  </p>
                  <p>
                    <span class="checkout-info__user__name">
                      {userProfile.first_name + " " + userProfile.last_name}
                    </span>
                    <span class="checkout__item__price--separate"></span>
                    <span class="checkout-info__user__phone">0822477841</span>
                  </p>
                  <p class="checkout-info__user__address">
                    {userProfile.address}
                  </p>
                </div>
                <div class="checkout-info__discount">
                  <p>
                    <span>Tiki Khuyến Mãi</span>
                    <span>Có thể chọn 2</span>
                  </p>
                  <a class="checkout-info__discount__link" href="#1">
                    <i class="fa fa-ticket" aria-hidden="true"></i>Chọn hoặc
                    nhập Khuyến mãi
                  </a>
                </div>
                <div class="checkout-info__total">
                  <p class="checkout-info__total__temp">
                    <span>Tạm tính</span>
                    <span>{totalPrice(cart)}đ</span>
                  </p>
                  <p class="checkout-info__total__primary">
                    <span>Thành tiền</span>
                    <span>{totalPrice(cart)}đ</span>
                  </p>
                  <p class="checkout-info__total__more">
                    (Đã bao gồm VAT nếu có)
                  </p>
                </div>
                <button
                  onClick={() => handleDataOrder(cart)}
                  class="btn checkout-info__submit"
                >
                  Tiến hành đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
