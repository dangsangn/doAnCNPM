import React from "react";
// import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { popupRegister } from "../../actions/popup-form";
import { userLoginSuccess } from "../../actions/userAction";
import userAPI from "../../api/userAPI";
import { toastError, toastSucces } from "../../helpers/toastMessage";
import "./style.css";

function RegisterByGoogle() {
  const dispatch = useDispatch();
  const signup = async (res) => {
    const googleresponse = {
      // Name: res.profileObj.name,

      // email: res.profileObj.email,

      // token: res.googleId,

      // Image: res.profileObj.imageUrl,

      // ProviderId: "Google",
      username: res?.profileObj?.email,
      email: res?.profileObj?.email,
      //email: res.profileObj.email,
      password: res?.googleId,
      password_confirmation: res?.googleId,
      //password_confirmation: res.googleId,
    };
    console.log(googleresponse);
    try {
      const res = await userAPI.register(googleresponse);
      if (res.status === 201) {
        dispatch(popupRegister(false));
        dispatch(userLoginSuccess(res.data.email));
        toastSucces("Register successfully!");
        sessionStorage.setItem(
          "userData",
          JSON.stringify(res.data.authentication_token)
        );
      }
    } catch (error) {
      console.log(error);
      toastError("Opp! Please try again!");
    }
  };

  const responseGoogle = (response) => {
    signup(response);
  };

  return (
    <div className="login-goole">
      <div className="row">
        <div style={{ paddingTop: "20px" }} className="col-sm-12">
          <div className="col-sm-4">
            <GoogleLogin
              clientId="231323238286-k9fopveh3l4a27t609vjvi76gs3tm29t.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            ></GoogleLogin>
          </div>

          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterByGoogle;
