import React from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../actions/userAction";
import * as actionsPopupForm from "./../../actions/popup-form";
import LoginFormik from "./../../components/login-formik";
import LoginByGoole from "./../../components/login-google";

function Login(props) {
  const dispatch = useDispatch();
  const initialValues = {
    nameuser: "",
    password: "",
  };

  const handleSubmit = async (value) => {
    const data = {
      username: value.name,
      password: value.password,
    };
    dispatch(userLogin(data));
  };

  const handelExitButton = () => {
    dispatch(actionsPopupForm.popupLogin(false));
  };

  const loginComponent = (
    <div className="container-dialog" id="login-page">
      <div className="content-dialog" id="login-dialog">
        <div className="row">
          <div className="col l-7">
            <div className="content-form">
              <h2 className="content-form__title">Xin chào,</h2>
              <p className="content-form__title-content">Đăng nhập tài khoản</p>
              <LoginFormik
                onSubmit={handleSubmit}
                initialValues={initialValues}
              />
              <a className="content-form-link-email" href="#1">
                Đăng nhập bằng email
              </a>

              <div className="content-form__separate">
                <span>Hoặc tiếp tục bằng</span>
              </div>
              <div className="content-form__social">
                <a href="#1">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <LoginByGoole />
                <a href="#1">
                  <img src="/images/icon-zalo.png" alt="" />
                </a>
              </div>
              <p className="content-form__combine">
                Bằng việc tiếp tục, bạn đã chấp nhận{" "}
                <a href="http://">điều khoản sử dụng</a>
              </p>
            </div>
          </div>
          <div className="col l-5">
            <div className="content-right">
              <img
                className="content-right__image"
                src="/images/image-login-tiki.png"
                alt=""
              />
              <div className="content-right__sologan">
                <h3>Mua sắm tại Tiki</h3>
                <p>Siêu ưu đãi mỗi ngày</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="exit-dialog"
          onClick={() => {
            handelExitButton();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
  let result = loginComponent;

  return result;
}

export default Login;
