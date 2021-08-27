import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogout } from "../../actions/userAction";
import { categoryAPI } from "../../api/categoryAPI";
import FormSearch from "../FormSearch";
import Notification from "../Notification";
import * as actionsPopupForm from "./../../actions/popup-form";
import { Menu, Dropdown, Button } from "antd";
import "./Header.css";

function showMiniCart(list) {
  let result = null;
  if (list.length > 0) {
    result = list.map((item, index) => {
      return (
        <div className="header--bottom-has-cart__item" key={index}>
          <div className="header--bottom-has-cart__item__img">
            <img src={item.link_image} alt={item.name} />
          </div>
          <p className="header--bottom-has-cart__item__name">{item.name}</p>
          <p className="header--bottom-has-cart__item__price">
            <sup>đ </sup>
            {item.price}
          </p>
        </div>
      );
    });
  }
  return result;
}

function Header() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let fetchCategoriesAPI = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoriesAPI();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <Link
          to="/user/account/edit"
          className="navbar__link navbar__link--menuItem"
        >
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <button
          onClick={handleLogout}
          className="navbar__link navbar__link--menuItem"
        >
          Đăng xuất
        </button>
      </Menu.Item>
    </Menu>
  );

  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(userLogout());
    localStorage.removeItem("authentication_token");
    history.push("/");
  }

  function showFormRegister() {
    dispatch(actionsPopupForm.popupRegister(true));
  }

  function showFormLogin() {
    dispatch(actionsPopupForm.popupLogin(true));
  }

  function handleRedirectToCartPage() {
    if (!user.isLogin) {
      dispatch(actionsPopupForm.popupLogin(true));
    } else {
      history.push("/carts/users");
    }
  }

  return (
    <div className="header">
      <div className="grid wide">
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__list-item navbar__list-item--separated">
              <a
                href="https://shopeco-manage.netlify.app"
                className="navbar__link"
              >
                Kênh người bán
              </a>
            </li>
            <li className="navbar__list-item navbar__list-item--separated">
              <a href="#1" className="navbar__link">
                Tải ứng dụng
              </a>
              <div className="navbar__qr">
                <img
                  src="/images/qr-code.png"
                  alt=""
                  className="navbar__qr-code"
                />
                <div className="navbar__qr-link">
                  <a href="#1" className="navbar__qr-link-download">
                    <img src="/images/apple-store.png" alt="Apple store" />
                  </a>
                  <a href="#1" className="navbar__qr-link-download">
                    <img src="/images/ch-play.png" alt="Apple store" />
                  </a>
                </div>
              </div>
            </li>
            <li className="navbar__list-item">
              Kết nối
              <a href="#2" className="navbar__link mg-l-8">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#4" className="navbar__link mg-l-8">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>

          <ul className="navbar__list">
            <div className="row">
              <li className="navbar__list-item">
                <a href="#2" className="navbar__link">
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                  Thông báo
                </a>
                <Notification />
              </li>
              <li className="navbar__list-item">
                <a href="#1" className="navbar__link">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  Trợ giúp
                </a>
              </li>
              {!user.isLogin ? (
                <div>
                  <li className="navbar__list-item navbar__list-item--separated">
                    <button
                      id="register-btn"
                      onClick={() => showFormRegister()}
                      className="navbar__link navbar__link--bold"
                    >
                      Đăng ký
                    </button>
                  </li>
                  <li className="navbar__list-item ">
                    <button
                      id="login-btn"
                      className="navbar__link navbar__link--bold"
                      onClick={showFormLogin}
                    >
                      Đăng nhập
                    </button>
                  </li>
                </div>
              ) : (
                <div className="navbar__list-item__user">
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Button>
                      {user.first_name
                        ? user.first_name + " " + user.last_name
                        : user.email}
                    </Button>
                  </Dropdown>
                </div>
              )}
            </div>
          </ul>
        </nav>

        <div className="header__bottom">
          <div className="row">
            <div className="col l-2">
              <div className="header__bottom__link">
                <Link to="/" className="header__bottom-image" href="#1">
                  Shop Eco
                </Link>
              </div>
            </div>
            <div className="col l-8 ">
              <div className="header__bottom-body">
                {/* component form search */}
                <FormSearch />

                <nav className="navbar">
                  <ul className="navbar__list">
                    <div className="row reset-mg">
                      {
                        // eslint-disable-next-line
                        categories.map((item, index) => {
                          if (index < 7) {
                            return (
                              <li className="navbar__list-item" key={index}>
                                <Link
                                  to={`/${item.id}/listProduct`}
                                  className="navbar__link navbar__link--small"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          }
                        })
                      }
                    </div>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col l-2">
              <div className="header__bottom-cart">
                <div className="header__bottom-cart__container">
                  <span className="header__bottom-cart__quantity">
                    {!user.isLogin ? 0 : cart.listCart.length}
                  </span>
                  <button
                    onClick={handleRedirectToCartPage}
                    className="btn--cart header__bottom-cart-link"
                    href="#1"
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </button>
                  <div className="header__bottom-show-cart">
                    {!user.isLogin ? (
                      <div className="header__bottom-no-cart">
                        <img
                          className="header__bottom-no-cart-img"
                          src="/images/no-product.png"
                          alt="No product"
                        />
                        <p className="header__bottom-no-cart-notify">
                          Chưa có sản phẩm
                        </p>
                      </div>
                    ) : cart.listCart?.length > 0 ? (
                      <div
                        className="header__bottom-has-cart"
                        onClick={() => history.push("/carts/users")}
                      >
                        {showMiniCart(cart.listCart)}
                      </div>
                    ) : (
                      <div className="header__bottom-no-cart">
                        <img
                          className="header__bottom-no-cart-img"
                          src="/images/no-product.png"
                          alt="No product"
                        />
                        <p className="header__bottom-no-cart-notify">
                          Chưa có sản phẩm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
