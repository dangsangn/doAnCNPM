import React from "react";
import Category from "../../components/categorys";
import SlideBar from "./../../components/slideBar";
import ProductDiscountList from "./productDiscoutList";
import ProductNewList from "./productNewList/ProductNewList";
import ProductList from "./productRatingList";
import "./style.scss";

function HomePage(props) {
  return (
    <div className="home-page">
      <div className="slide-bar">
        <div className="grid wide">
          <div className="row">
            <div className="col l-8">
              <SlideBar />
            </div>
            <div className="col l-4">
              <div className="slide-bar__more">
                <div className="row">
                  <div className="col l-12">
                    <div
                      className="slide-bar__detail"
                      style={{ paddingBottom: "8px" }}
                    >
                      <img
                        src="/images/slidebar/slide-detail1.jfif"
                        alt="imageSlide"
                        className="slide-bar__detail-img"
                      />
                    </div>
                  </div>
                  <div className="col l-12">
                    <div className="slide-bar__detail">
                      <img
                        src="/images/slidebar/slide-detail2.jfif"
                        alt=""
                        className="slide-bar__detail-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid wide">
        <ProductDiscountList />
        <div className="category">
          <h2 className="category__title">DANH MỤC</h2>
          <div className="category__container">
            <Category />
          </div>
        </div>

        <ProductNewList />
        <div className="product-list">
          <div className="product-list__header">
            <h2 className="product-list__header-title">GỢI Ý HÔM NAY</h2>
          </div>
          <div className="product-list__body">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
