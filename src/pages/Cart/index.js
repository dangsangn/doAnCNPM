import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { clearIsProductBought } from "../../actions/cartAction";
import { formatter } from "../../helpers/formatToPriceMoney";
import * as actionOrder from "./../../actions/order-actions";
import * as toastMessage from "./../../helpers/toastMessage";
import CartItem from "./cartItem";
import "./style.scss";

function showCart(listCart) {
  return listCart.map((item) => <CartItem data={item} key={item.id} />);
}

function totalPrice(listCart) {
  let result = 0;
  if (listCart.length > 0) {
    result = listCart.reduce((sum, item) => {
      if (!item.isBought) return sum;
      return sum + item.price * item.count;
    }, 0);
  }
  return result;
}

function Cart(props) {
  const userProfile = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearIsProductBought());
  }, [dispatch]);

  const handleDataOrder = (cart) => {
    let data = cart.filter((item) => item.isBought);
    dispatch(actionOrder.addOrder(data));

    if (data.length > 0) {
      history.push(`/checkout/payment`);
    } else {
      toastMessage.toastError("Please choose a product!");
    }
  };

  return (
    <div className="cart">
      <div className="grid wide">
        <div className="checkout">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </ol>
          </nav>

          <h2 className="checkout__header">
            Giỏ hàng{" "}
            <span className="checkout__amount-product">
              ({cart.listCart.length} sản phẩm)
            </span>
          </h2>
          <div className="row">
            <div className="col l-9">
              <div className="checkout__body">
                <nav>
                  <a href="#1" className="checkout__body__link">
                    Tiki Tranding{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </nav>
                {cart.listCart.length === 0
                  ? "No have product in cart"
                  : showCart(cart.listCart)}
              </div>
            </div>

            <div className="col l-3">
              <div className="checkout-info">
                <div className="checkout-info__user">
                  <p>
                    <span className="checkout-info__user__title">
                      Địa chỉ nhận hàng
                    </span>
                    <NavLink
                      to="/user/address"
                      className="checkout-info__user__change"
                    >
                      Thay đổi
                    </NavLink>
                  </p>
                  <p>
                    <span className="checkout-info__user__name">
                      {userProfile.first_name + " " + userProfile.last_name}
                    </span>
                    <span className="checkout__item__price--separate"></span>
                    <span className="checkout-info__user__phone">
                      0822477841
                    </span>
                  </p>
                  <p className="checkout-info__user__address">
                    {userProfile.address}
                  </p>
                </div>
                <div className="checkout-info__discount">
                  <p>
                    <span>Tiki Khuyến Mãi</span>
                    <span>Có thể chọn 2</span>
                  </p>
                  <a className="checkout-info__discount__link" href="#1">
                    <i className="fa fa-ticket" aria-hidden="true"></i>Chọn hoặc
                    nhập Khuyến mãi
                  </a>
                </div>
                <div className="checkout-info__total">
                  <p className="checkout-info__total__temp">
                    <span>Tạm tính</span>
                    <span>{formatter.format(totalPrice(cart.listCart))}</span>
                  </p>
                  <p className="checkout-info__total__primary">
                    <span>Thành tiền</span>
                    <span>{formatter.format(totalPrice(cart.listCart))}</span>
                  </p>
                  <p className="checkout-info__total__more">
                    (Đã bao gồm VAT nếu có)
                  </p>
                </div>
                <button
                  onClick={() => handleDataOrder(cart.listCart)}
                  className="btn checkout-info__submit"
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
