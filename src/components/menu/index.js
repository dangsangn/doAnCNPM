import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import "./style.css";

function Menu() {
  const userProfile = useSelector((state) => state.user);
  let menus = [
    {
      to: "/user/account/edit",
      label: "Thông tin tài khoản",
      exact: true,
    },
    {
      to: "/user/notification",
      label: "Thông báo của tôi",
      exact: false,
    },
    {
      to: "/user/order/history",
      label: "Quản lý đơn hàng",
      exact: false,
    },
    {
      to: "/user/address",
      label: "Số địa chỉ",
      exact: false,
    },
  ];

  let result = menus.map((menu, index) => {
    return (
      <MenuLink
        key={index}
        label={menu.label}
        to={menu.to}
        activeOnlyWhenExact={menu.exact}
      />
      // <Link to={menu.to} className="nav-link">
      //   {menu.label}
      // </Link>
    );
  });

  return (
    <div className="container">
      <div className="title-user">
        <div className="title-user__img">
          <img
            src="https://salt.tikicdn.com/desktop/img/avatar.png"
            alt="imageUser"
          />
        </div>
        <div className="title-user__info">
          <p>Tài khoản của</p>
          <p>
            {userProfile.first_name
              ? userProfile.first_name + " " + userProfile.last_name
              : userProfile.email}
          </p>
        </div>
      </div>
      <ul className="nav nav-pills menu-account">{result}</ul>
    </div>
  );
}

let MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li className="nav-item">
      <Link to={to} className={match ? "active nav-link" : "nav-link"}>
        {label}
      </Link>
    </li>
  );
};

export default Menu;
