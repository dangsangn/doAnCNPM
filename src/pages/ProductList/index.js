import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import Loading from "../../components/loading";
import ProductItem from "../../components/productItem";
import * as actionTypesProductInCategory from "./../../actions/product-in-category";
import "./style.scss";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function showProductList(products) {
  return products.map((item) => (
    <div key={item.id} className="col l-2-4">
      <ProductItem data={item} />
    </div>
  ));
}

function showSlides(listImg) {
  let result = [];
  let temp = [...listImg];
  for (let i = 0; i < listImg.length; i += 2) {
    result.push(
      <SwiperSlide key={i}>
        <div className="img-carousel">
          {temp.splice(0, 2).map((item) => (
            <div
              key={Math.random() * Math.random()}
              className="img-carousel__item"
            >
              <img src={item.src} alt="img slider" />
            </div>
          ))}
        </div>
      </SwiperSlide>
    );
  }
  return result;
}

const listImg = [
  {
    src: "../images/slidebar/slidebar1.jfif",
  },
  {
    src: "../images/slidebar/slidebar2.jfif",
  },
  {
    src: "../images/slidebar/slidebar3.jfif",
  },
  {
    src: "../images/slidebar/slidebar4.jfif",
  },
  {
    src: "../images/slidebar/slidebar5.jfif",
  },
  {
    src: "../images/slidebar/slidebar6.jfif",
  },
  {
    src: "../images/slidebar/slidebar7.jfif",
  },
  {
    src: "../images/slidebar/slidebar4.jfif",
  },
];

function ProducListCategory(props) {
  const match = props.match;
  const [products, setProducts] = useState();
  const pathName = match.match.params.categoryId;
  const dispatch = useDispatch();
  const productsInCategory = useSelector((state) => state.productInCategory);

  useEffect(() => {
    const fetchProductsListCategoryAPI = async () => {
      const response = await axios.get(
        `https://your-ecommerce.herokuapp.com/categories/${pathName}/products`
      );
      setProducts(response.data.products);
      dispatch(
        actionTypesProductInCategory.fetchProductInCategory(
          response.data.products
        )
      );
    };
    fetchProductsListCategoryAPI();
  }, [pathName, dispatch]);

  const handelDescreaseProduct = () => {
    dispatch(actionTypesProductInCategory.sortDecreateProductInCategory());
    setProducts(productsInCategory);
  };

  const handelInscreaseProduct = () => {
    dispatch(actionTypesProductInCategory.sortIncreateProductInCategory());
    setProducts(productsInCategory);
  };
  const handelPopularProduct = () => {
    dispatch(actionTypesProductInCategory.sortPopularProductInCategory());
    setProducts(productsInCategory);
  };
  const handelDiscountProduct = () => {
    dispatch(actionTypesProductInCategory.sortDiscountProductInCategory());
    setProducts(productsInCategory);
  };

  return (
    <div className="product-list">
      <div className="grid wide">
        <div className="row">
          <div className="col l-12">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className="mySwiper"
            >
              {showSlides(listImg)}
            </Swiper>
          </div>
        </div>

        <div className="row">
          <div className="col l-12">
            <nav className="nav nav-pills nav-fill nav-controll-product">
              <button
                className="btn btn-primary btn-controll-product-link"
                onClick={handelPopularProduct}
              >
                Phổ Biến
              </button>
              <button
                className="btn btn-primary btn-controll-product-link"
                onClick={handelDiscountProduct}
              >
                Giảm giá
              </button>
              <button className="btn btn-primary btn-controll-product-link">
                Hàng Mới
              </button>
              <button
                className="btn btn-primary btn-controll-product-link"
                onClick={handelInscreaseProduct}
              >
                Giá Thấp
              </button>
              <button
                className="btn btn-primary btn-controll-product-link"
                onClick={handelDescreaseProduct}
              >
                Giá Cao
              </button>
            </nav>
          </div>
        </div>

        <div className="row">
          {!products ? <Loading /> : showProductList(products)}
        </div>
      </div>
    </div>
  );
}

export default ProducListCategory;
