import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import PageSearch from "./pages/PageSearch";
import ProductDetailPage from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => {
      return <Home />;
    },
  },
  {
    path: "/:categoryId/listProduct",
    exact: false,
    main: (match) => {
      return <ProductList match={match} />;
    },
  },
  {
    path: "/search",
    exact: false,
    main: () => {
      return <PageSearch />;
    },
  },
  {
    path: "/shop/:shopId",
    exact: true,
    main: () => {
      return <ShopPage />;
    },
  },
  {
    path: "/checkout/payment",
    exact: true,
    main: () => {
      return <Checkout />;
    },
  },
  {
    path: "/cart/:userId",
    exact: true,
    main: () => {
      return <Cart />;
    },
  },
  {
    path: "/productItem/:productId",
    exact: false,
    main: ({ match }) => {
      return <ProductDetailPage match={match} />;
    },
  },
  {
    path: "/user/account/edit",
    exact: true,
    main: () => {
      return <Account />;
    },
  },
  {
    path: "/user/notification",
    exact: true,
    main: () => {
      return <Account />;
    },
  },
  {
    path: "/user/order/history",
    exact: true,
    main: () => {
      return <Account />;
    },
  },
  {
    path: "/user/address",
    exact: true,
    main: () => {
      return <Account />;
    },
  },
];

export default routes;
