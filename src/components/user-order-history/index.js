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
        const res = await orderAPI.getListOrder();
        setListOrder(res.data.orders);
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
      render: ({ id, text }) => <Link to={id}>{text}</Link>,
    },
    {
      title: "Image",
      dataIndex: "iamge",
      key: "age",
      render: (url) => {
        return <img src={url} alt="img" />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <p>{formatter.format(price)}</p>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      name: { id: 1, text: "abc" },
      image: 32,
      price: 1000,
    },
    {
      key: "1",
      name: { id: 1, text: "abc" },
      image: 32,
      price: 1000,
    },
    {
      key: "1",
      name: { id: 1, text: "abc" },
      image: 32,
      price: 1000,
    },
  ];

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
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default UserOrderHistory;
