import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderAPI } from "../../api/orderAPI";
import "./style.css";

function showListOrder(list) {
  let result = null;
  if (list.length > 0) {
    result = list.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <Link to={`/user/order/history/${item.id}`}>{item.id}</Link>
          </td>
          <td>{item.created_at}</td>
          <td>{item.products[0].name}</td>
          <td>{item.products[0].price} ₫</td>
          <td>{item.order_status}</td>
        </tr>
      );
    });
  }
  return result;
}

function UserOrderHistory(props) {
  const [listOrder, setListOrder] = useState();
  useEffect(() => {
    const fetchListOrderAPI = async () => {
      try {
        const response = await orderAPI.get();
        setListOrder(response.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListOrderAPI();
  }, []);
  return (
    <div className="user-order-history">
      <h2>Đơn hàng của tôi</h2>
      <div className="user-order-history__container">
        <table>
          <thead>
            <th>Mã đơn hàng</th>
            <th>Ngày mua</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái đơn hàng</th>
          </thead>
          <tbody>{listOrder ? showListOrder(listOrder) : ""}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrderHistory;
