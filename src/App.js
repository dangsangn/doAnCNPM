import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getListCart } from "./actions/cartAction";
import { getProfileUser } from "./actions/userAction";
import ButtonToTop from "./components/ButtonToTop";
import Footer from "./components/footer";
import Header from "./components/header";
import ScrollToTop from "./components/ScrollToTop";
import PrimaryLayout from "./layouts/PrimaryLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import PrimaryRouters from "./routers";
import profileRouters from "./routers-sub";
import history from "./utils/history";

function App() {
  const popupForm = useSelector((state) => state.popupForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileUser());
    dispatch(getListCart());
  }, [dispatch]);

  const showRouterPrimary = (routers) => {
    return routers.map((router) => {
      return (
        <PrimaryLayout
          key={router.path}
          path={router.path}
          component={router.main}
          exact={router.exact}
        />
      );
    });
  };

  const showRouterProfile = (routers) => {
    return routers.map((router) => {
      return (
        <ProfileLayout
          key={router.path}
          path={router.path}
          component={router.main}
          exact={router.exact}
        />
      );
    });
  };

  return (
    <Router history={history}>
      <Header />
      <Switch>
        {showRouterPrimary(PrimaryRouters)}
        {showRouterProfile(profileRouters)}
      </Switch>
      <ButtonToTop />
      <Footer />
      {popupForm.isPopupLogin && <LoginPage />}
      {popupForm.isPopupRes && <RegisterPage />}
      <ToastContainer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
