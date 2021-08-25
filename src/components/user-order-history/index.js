import { Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { orderAPI } from "../../api/orderAPI";
import { formatter } from "../../helpers/formatToPriceMoney";
import "./style.scss";

function UserOrderHistory(props) {
  const [listOrder, setListOrder] = useState();

  useEffect(() => {
    const getListOder = async () => {
      try {
        const res = await orderAPI.getListOrder();
        setListOrder(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getListOder();
  }, []);

  async function confirm(id) {
    try {
      const res = await orderAPI.cancelOrder(id);
      if (res.status === 200) {
        setListOrder((pre) => pre.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user-order-history">
      <h2>Đơn hàng của tôi</h2>
      <div className="user-order-history__container">
        <table className="user-order-history__table">
          <thead>
            <tr>
              <th>ID Product</th>
              <th>Name product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Name shop</th>
            </tr>
          </thead>
          <tbody>
            {listOrder ? (
              listOrder.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <th colSpan="5" className="user-order-history__table__info">
                      <div>
                        <span>ID Order: {item.id}</span>
                        <span>
                          Total price: {formatter.format(item.total_price)}
                        </span>
                        <span>Create At: {item.created_at}</span>
                        <span>Status: {item.order_status}</span>
                        {item.order_status === "Chờ xác nhận" ? (
                          <Popconfirm
                            title="Are you sure to delete this order?"
                            onConfirm={() => confirm(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="btn--cancel-oder">
                              Cancel Order
                            </button>
                          </Popconfirm>
                        ) : null}
                      </div>
                    </th>
                  </tr>
                  {item.products.map((item) => (
                    <tr key={item.id * Math.random()}>
                      <td style={{ width: "10%" }}>{item.id}</td>
                      <td style={{ width: "40%" }}>{item.name}</td>
                      <td className="user-order-history__table__img">
                        <img src={item.link_image} alt={item.name} />
                      </td>
                      <td>{formatter.format(item.price)}</td>
                      <td>{item.name_shop}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td>
                  <div>loading</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrderHistory;
