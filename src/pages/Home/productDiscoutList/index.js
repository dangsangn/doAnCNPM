import React, { useEffect, useState } from "react";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import productApi from "../../../api/productAPI";
import Loading from "../../../components/loading";
import ProductItem from "../../../components/productItem";
import "./style.scss";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function showProducts(productsList) {
  let result = null;
  if (productsList.length > 0) {
    result = productsList.map((item) => {
      return (
        <SwiperSlide key={item.id}>
          <ProductItem data={item} />
        </SwiperSlide>
      );
    });
  }
  return result;
}

function ProductDiscountList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let fetchProductsDiscountAPI = async () => {
      try {
        const response = await productApi.getProductsDiscount();
        setProducts(response.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsDiscountAPI();
  }, []);
  return (
    <div className="price-suprice">
      <h2 className="price-suprice__header">
        Gía sốc <i className="fa fa-bolt" aria-hidden="true"></i> hôm nay
      </h2>
      {!products ? (
        <Loading />
      ) : (
        <div className="product-extend">
          <Swiper
            slidesPerView={5}
            spaceBetween={16}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {showProducts(products)}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ProductDiscountList;
