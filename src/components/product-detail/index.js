import { Button, message, Modal, Rate } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import { formatter } from "../../helpers/formatToPriceMoney";
import * as cartAction from "./../../actions/cartAction";
import * as actionsForm from "./../../actions/popup-form";
import "./product-detail.css";

function ProductDetail({ dataProduct }) {
  const user = useSelector((state) => state.user);
  const {
    rating,
    name,
    discount,
    price,
    description,
    link_image,
    name_shop,
    shop_link_image,
    shop_id,
    category,
    count,
    rating_shop,
  } = dataProduct;
  const history = useHistory();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleAddProductToCart = async (check) => {
    if (!user.isLogin) {
      dispatch(actionsForm.popupLogin(true));
    } else {
      if (count < 1) {
        message.error("Sản phẩm hiện tại đã hết!");
      } else {
        dispatch(
          cartAction.addProductToCart({
            ...dataProduct,
            quantity,
          })
        );
        if (check.toCartPage) {
          history.push("/carts/users");
        } else {
          message.success("Add product to cart succes");
        }
      }
    }
  };

  const handleChangQuantity = (value) => {
    if (value + quantity > count) {
      message.error("Sản phẩm hiện tại không đủ!");
    } else {
      setQuantity(quantity + value);
    }
  };

  const handleToPageShop = () => {
    history.push("/shop/" + shop_id);
  };

  return (
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
                    Danh mục: <span>{category}</span>
                  </p>
                  <h2>{name}</h2>
                  <Button onClick={showModal}> Detail Info</Button>
                  <Modal
                    title="Information Detail Product"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>{description}</p>
                  </Modal>
                  <div className="product__info__rating">
                    {rating > 0 && <Rate allowHalf defaultValue={rating} />}
                  </div>
                </div>
                <div className="product__info__header__right">
                  <span>
                    <i className="far fa-heart"></i>
                  </span>
                </div>
              </div>
              <div className="product__info__body">
                <div className="row">
                  <div className="con l-8">
                    <div className="product__info__price">
                      <p>
                        <span className="product__info__price--discount">
                          {formatter.format(price - discount)}
                        </span>
                        <span className="product__info__price--original">
                          {formatter.format(price)}
                        </span>
                        <span className="product__info__discount">
                          -{Number.parseInt((discount / price) * 100)}%
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
                      <h3>Số sản phẩm đang còn</h3>
                      <span className="product__info__vourcher__tag">
                        {count}
                      </span>
                    </div>
                    <p className="product__info__link">
                      Bạn hãy{" "}
                      <a className="product__info__link-address" href="http://">
                        NHẬP ĐỊA CHỈ
                      </a>{" "}
                      nhận hàng để được dự báo thời gian & chi phí giao hàng một
                      cách chính xác nhất.
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
                          disabled={quantity === count ? true : false}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="product__info__group-actions">
                      <button
                        className="btn btn-add-product"
                        onClick={() =>
                          handleAddProductToCart({ toCartPage: true })
                        }
                        disabled={count === 0 && true}
                        style={
                          count === 0
                            ? { cursor: "not-allowed" }
                            : { cursor: "pointer" }
                        }
                      >
                        Mua ngay
                      </button>
                      <button
                        className="btn btn-pay-later"
                        onClick={() =>
                          handleAddProductToCart({ toCartPage: false })
                        }
                        disabled={count === 0 && true}
                        style={
                          count === 0
                            ? { cursor: "not-allowed" }
                            : { cursor: "pointer" }
                        }
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                  <div className="col l-4">
                    <div className="shop-extend">
                      <div className="shop-extend__name">
                        <span className="shop-extend__name__img">
                          <img
                            src={
                              shop_link_image
                                ? shop_link_image
                                : "https://img.icons8.com/cotton/2x/shop--v3.png"
                            }
                            alt={"shopName"}
                          />
                        </span>
                        <span className="shop-extend__name__tag">
                          {name_shop}
                        </span>
                      </div>
                      <div className="row">
                        <div className="col l-6">
                          <div className="shop-extend__container">
                            <p className="shop-extend__container__description">
                              <span>
                                {Number.parseFloat(rating_shop).toFixed(1)}
                              </span>
                              /<span>5</span>
                              <i className="fa fa-star" aria-hidden="true"></i>
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
                              <span>0</span>
                            </p>
                            <p>Theo dõi</p>
                            <button
                              className="btn shop-extend__btn"
                              disabled={true}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
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
                              <i className="fa fa-undo" aria-hidden="true"></i>
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
  );
}

export default withRouter(ProductDetail);
