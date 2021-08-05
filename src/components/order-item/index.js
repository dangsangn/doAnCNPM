import React from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../helpers/formatToPriceMoney";
import "./style.css";
function OrderItem(props) {
  const { id, link_image, name, price, count } = props.data;
  return (
    <tr className="order__item">
      <td className="order__item__product-name">
        <div className="order__item__img">
          <Link to={`/productItem/${id}`}>
            <img src={link_image} alt={name} />
          </Link>
        </div>
        <p>{name}</p>
      </td>
      <td>{formatter.format(price)}</td>
      <td>{count}</td>
      <td>{formatter.format(price * count)}</td>
    </tr>
  );
}

export default OrderItem;
