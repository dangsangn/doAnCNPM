import "./product-detail.css";
import * as cartAction from "./../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import * as actionsForm from "./../../actions/popup-form";
import axiosClient from "../../api/axiosClient";
import * as toastMessage from "./../../helpers/toastMessage";
import historyNew from "../../utils/history";
import { withRouter } from "react-router";

function showRating(value) {
  let result = [];
  for (let i = 0; i < value; i++) {
    result.push(<i className="fa fa-star" aria-hidden="true"></i>);
  }
  for (let i = value; i < 5; i++) {
    result.push(<i className="fa fa-star-o" aria-hidden="true"></i>);
  }
  return result;
}

function ProductDetail(props) {
  const user = useSelector((state) => state.user);

  const userId = user.email;
  const {
    id,
    rating,
    name,
    price,
    description,
    link_image,
    name_shop,
    shop_link_image,
    shop_id,
  } = props.dataProduct;

  const token = localStorage.getItem("authentication_token");
  const myConfig = {
    headers: { Authorization: token },
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddProductToCart = async (value) => {
    if (!userId) {
      return dispatch(actionsForm.popupLogin(true));
    }
    if (token) {
      await axiosClient.post(
        "https://your-ecommerce.herokuapp.com/carts",
        { product_id: id, count: quantity },
        myConfig
      );
    }
    if (value) {
      history.push(`/cart/${userId}`);
      dispatch(
        cartAction.addProductToCart({
          id,
          rating,
          name,
          price,
          count: quantity,
          description,
          link_image,
          isBought: true,
        })
      );
    } else {
      toastMessage.toastSucces("Add product to cart success");
      dispatch(
        cartAction.addProductToCart({
          id,
          rating,
          name,
          price,
          description,
          count: quantity,
          link_image,
          isBought: false,
        })
      );
    }
  };

  const handleChangQuantity = (value) => {
    setQuantity(quantity + value);
  };

  const handleToPageShop = () => {
    //historyNew.push("/shop/" + shop_id);
    //console.log(historyNew);
    history.push("/shop/" + shop_id);
  };

  return (
    <div className=" container--product">
      <div className="grid wide">
        <div className="product">
          <div className="row">
            <div className="col l-4">
              <div className="poduct__img">
                <img src={link_image} alt={name} />
              </div>
            </div>
            <div className="col l-8">
              <div className="product__info">
                <div className="product__info__header">
                  <div className="product__info__header__left">
                    <p>
                      Danh mục: <span>category name</span>
                    </p>
                    <h2>{name}</h2>
                    <div className="product__info__rating">
                      {showRating(rating)}
                    </div>
                  </div>
                  <div className="product__info__header__right">
                    <span>
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <div className="product__info__body">
                  <div className="row">
                    <div className="con l-8">
                      <div className="product__info__price">
                        <p>
                          <span className="product__info__price--discount">
                            {price - (price * 50) / 100} ₫
                          </span>
                          <span className="product__info__price--original">
                            {price} ₫
                          </span>
                          <span className="product__info__discount">
                            -{50}%
                          </span>
                        </p>
                        <a href="http://">
                          Hoàn tiền 15% tối đa 600k/tháng
                          <i
                            className="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <div className="product__info__vourcher">
                        <h3>1 Mã giảm giá</h3>
                        <span className="product__info__vourcher__tag">
                          Giảm 5%
                        </span>
                      </div>
                      <p className="product__info__link">
                        Bạn hãy{" "}
                        <a
                          className="product__info__link-address"
                          href="http://"
                        >
                          NHẬP ĐỊA CHỈ
                        </a>{" "}
                        nhận hàng để được dự báo thời gian & chi phí giao hàng
                        một cách chính xác nhất.
                      </p>
                      <div className="product__info__group-amout">
                        <p>Số lượng</p>
                        <div className="checkout__item__action">
                          <button
                            disabled={quantity === 1 ? true : false}
                            type="button"
                            className={
                              quantity === 1
                                ? "btn-disible checkout__item__action__btn-increase"
                                : "checkout__item__action__btn-increase"
                            }
                            onClick={() => handleChangQuantity(-1)}
                          >
                            -
                          </button>
                          <span className="checkout__item__action__display">
                            {quantity}
                          </span>
                          <button
                            className="checkout__item__action__btn-decrease"
                            onClick={() => handleChangQuantity(+1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="product__info__group-actions">
                        <button
                          className="btn btn-add-product"
                          onClick={() => handleAddProductToCart(true)}
                        >
                          Mua ngay
                        </button>
                        <button
                          className="btn btn-pay-later"
                          onClick={() => handleAddProductToCart(false)}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                    <div className="col l-4">
                      <div className="shop-extend">
                        <div className="shop-extend__name">
                          <span className="shop-extend__name__img">
                            <img src={shop_link_image} alt={"shopName"} />
                          </span>
                          <span className="shop-extend__name__tag">
                            {name_shop}
                          </span>
                        </div>
                        <div className="row">
                          <div className="col l-6">
                            <div className="shop-extend__container">
                              <p className="shop-extend__container__description">
                                <span>4.3</span>/<span>5.0</span>
                                <i
                                  className="fa fa-star"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <p>{"soldQuantity"}</p>
                              <button
                                onClick={handleToPageShop}
                                className="btn shop-extend__btn"
                              >
                                <i
                                  className="fa fa-shopping-basket"
                                  aria-hidden="true"
                                ></i>
                                Xem Shop
                              </button>
                            </div>
                          </div>
                          <div className="col l-6">
                            <div className="shop-extend__container">
                              <p className="shop-extend__container__description">
                                <span>73</span>
                              </p>
                              <p>Theo dõi</p>
                              <button className="btn shop-extend__btn">
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                Theo dõi
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="shop-extend__add-border-top ">
                          <span>Thời gian bảo hành</span>
                          <span>12 Tháng</span>
                        </p>
                        <p>
                          <span>Hình thức bảo hành</span>
                          <span>Tem bảo hành</span>
                        </p>
                        <p>
                          <span>Nơi bảo hành</span>
                          <span>Bảo hành chính hãng</span>
                        </p>
                        <p>
                          <span>Hướng dẫn bảo hành</span>
                          <a href="http://">Xem chi tiết</a>
                        </p>
                        <div className="row no-gutters">
                          <div className="col l-4 ">
                            <div className="shop-extend__policy">
                              <p>
                                <i
                                  className="fa fa-shield"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <p>Hoàn tiền 111% nếu giả</p>
                            </div>
                          </div>
                          <div className="col l-4">
                            <div className="shop-extend__policy">
                              <p>
                                <i
                                  className="fa fa-check-square"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <p>Mở hộp kiểm tra nhận hàng</p>
                            </div>
                          </div>
                          <div className="col l-4">
                            <div className="shop-extend__policy">
                              <p>
                                <i
                                  className="fa fa-undo"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <p>Đổi trả trong 30 ngày nếu sp lỗ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default withRouter(ProductDetail);
