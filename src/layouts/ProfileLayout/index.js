import React from "react";
import { Route, Link } from "react-router-dom";
import Menu from "../../components/menu";
function ProfileLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <div className="page-account">
          <div className="grid wide">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Account
                </li>
              </ol>
            </nav>
            <div className="page-account__content">
              <div className="row">
                <div className="col l-3">
                  <Menu />
                </div>
                <div className="col l-9">
                  <Component {...routerProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default ProfileLayout;
