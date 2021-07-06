import UserNotification from "./components/user-notification";
import UserOrderHistory from "./components/user-order-history";
import UserProfile from "./components/user-profile-edit";
import UserAddress from "./components/user-address";
import DetailOrder from "./pages/DetailOrder";

const routersSub = [
  {
    path: "/user/account/edit",
    exact: false,
    main: () => {
      return <UserProfile />;
    },
  },
  {
    path: "/user/order/history/:id",
    exact: true,
    main: () => {
      return <DetailOrder />;
    },
  },
  {
    path: "/user/notification",
    exact: false,
    main: () => {
      return <UserNotification />;
    },
  },
  {
    path: "/user/order/history",
    exact: false,
    main: () => {
      return <UserOrderHistory />;
    },
  },
  {
    path: "/user/address",
    exact: false,
    main: () => {
      return <UserAddress />;
    },
  },
];

export default routersSub;
