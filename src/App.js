import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getProfileUser } from "./actions/userAction";
import Footer from "./components/footer";
import Header from "./components/header";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import routers from "./routers";

function App() {
  const popupForm = useSelector((state) => state.popupForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>{showRouter(routers)}</Switch>
      <Footer />
      {popupForm.isPopupLogin && <LoginPage />}
      {popupForm.isPopupRes && <RegisterPage />}
      <ToastContainer />
      <ScrollToTop />
    </Router>
  );
}

function showRouter(routers) {
  let result = null;
  if (routers.length > 0) {
    result = routers.map((route, index) => {
      return (
        <Route key={index} path={route.path} exact={route.exact}>
          {route.main}
        </Route>
      );
    });
  }
  return result;
}

export default App;
