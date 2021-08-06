import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderAPI } from "../../api/orderAPI";
import { Table } from "antd";
import "./style.css";
import { formatter } from "../../helpers/formatToPriceMoney";

function UserOrderHistory(props) {
  const [listOrder, setListOrder] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });

  useEffect(() => {
    const getListOder = async () => {
      try {
        const list = [];
        const res = await orderAPI.getListOrder();
        console.log(res);
        res.data.orders.forEach((item) => {
          item.products.length > 0 &&
            item.products.forEach((product, index) => {
              list.unshift({
                key: (index + 1) * Math.random(),
                name: { id: product.id, text: product.name },
                image: product.link_image,
                totalPrice: product.price * product.count,
                dateOder: item.created_at,
                status: item.order_status,
              });
            });
        });
        setListOrder(list);
      } catch (error) {
        console.log(error);
      }
    };
    getListOder();
  }, []);

  function handleTableChange(pagination) {
    setPagination(pagination);
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: ({ id, text }) => (
        <Link
          to={"/productItem/" + id}
          style={{ width: "300px", display: "flex" }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => {
        return <img style={{ width: "100px" }} src={url} alt="img" />;
      },
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => {
        return <p style={{ margin: 0 }}>{formatter.format(price)}</p>;
      },
    },
    {
      title: "Date order",
      dataIndex: "dateOder",
      key: "dateOder",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="user-order-history">
      <h2>Đơn hàng của tôi</h2>
      <div className="user-order-history__container">
        <Table
          columns={columns}
          dataSource={listOrder}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default UserOrderHistory;
