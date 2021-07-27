import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { orderAPI } from "../../api/orderAPI";
import "./style.css";

function DetailOrder() {
  const userProfile = useSelector((state) => state.user);
  const match = useRouteMatch();
  const [infoOrder, setInfoOrder] = useState({});
  useEffect(() => {
    const fetchDetailOrder = async () => {
      try {
        const response = await orderAPI.getOrderDetail(match.params.id);
        setInfoOrder(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailOrder();
  }, [match]);
  return (
    <div className="detail-order">
      <div className="container">
        <p className="detail-order__title">
          Chi tiết đơn hàng {infoOrder.id} - <span>.....</span>
        </p>
        <div className="detail-order__time d-flex justify-content-space-between">
          <a href="#1">Xem hoá đơn</a>
          <span>Ngày đặt hàng: {infoOrder.create_at}</span>
        </div>
        <div className="row mb-50">
          <div className="col l-4 overflow-hidden ">
            <h3>ĐỊA CHỈ NGƯỜI NHẬN</h3>
            <div className="detail-order__user">
              <h4>{userProfile.first_name + " " + userProfile.last_name}</h4>
              <p className="detail-order__user__address">
                Địa chỉ: {userProfile.address}
              </p>
              <p className="detail-order__user__phone">
                Điện thoại: {userProfile.phone_number}
              </p>
            </div>
          </div>
          <div className="col l-4 overflow-hidden">
            <h3>HÌNH THỨC GIAO HÀNG</h3>
            <div className="detail-order__transpost">Update soon!!!</div>
          </div>
          <div className="col l-4 overflow-hidden">
            <h3>HÌNH THỨC THANH TOÁN</h3>
            <div className="detail-order__payment">
              {infoOrder.pay_method_name}
            </div>
          </div>
        </div>

        <table className="detail-order__list">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Giảm giá</th>
              <th>Tạm tính</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "50%" }}>
                <div className="detail-order__product d-flex align-items-center">
                  <div className="detail-order__img">
                    <img
                      src={
                        infoOrder.products
                          ? infoOrder.products[0].link_image
                          : ""
                      }
                      alt="img"
                    />
                  </div>
                  <div className="detail-order__product__name">
                    {infoOrder.products ? infoOrder.products[0].name : ""}
                    <br></br>
                    Cung cấp bởi:{" "}
                    {infoOrder.products ? infoOrder.products[0].name_shop : ""}
                  </div>
                </div>
              </td>
              <td>{infoOrder.products ? infoOrder.products[0].price : ""} ₫</td>
              <td>{infoOrder.products ? infoOrder.products[0].count : ""}</td>
              <td>{infoOrder.products ? infoOrder.products[0].count : ""}</td>
              <td>{infoOrder.products ? infoOrder.products[0].price : ""} ₫</td>
            </tr>
          </tbody>
        </table>

        <div className="detail-order__action">
          <div className="detail-order__action__wite-review">
            <p>
              <button
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Viết nhận xét
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body"></div>
            </div>
          </div>
          <button className="btn btn-primary btn--bought-again">Mua lại</button>
        </div>
        <div className="detail-order__total">
          <table>
            <tbody>
              <tr>
                <td>Tạm tính</td>
                <td>
                  {infoOrder.products ? infoOrder.products[0].price : ""} ₫
                </td>
              </tr>
              <tr>
                <td>Phí vận chuyển</td>
                <td>0 ₫</td>
              </tr>
              <tr>
                <td>Tổng cộng</td>
                <td class="detail-order__total__special">
                  {infoOrder.products ? infoOrder.products[0].price : ""} ₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
