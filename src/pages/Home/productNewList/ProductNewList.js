import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar1 from "../../../assets/images/imgBannerNewProducts/3a9076c95defe0361d01d7812eabdb63.png";
import Sidebar2 from "../../../assets/images/imgBannerNewProducts/22de50c82900b12513446817b281b2ae.png";
import Sidebar3 from "../../../assets/images/imgBannerNewProducts/a03e31017ad060376d44c71722a89521.jpg";
import Sidebar4 from "../../../assets/images/imgBannerNewProducts/bccdc6d5ba2b627f00cd21ce12c6f20c.png";
import Sidebar5 from "../../../assets/images/imgBannerNewProducts/e1a9a72d05041ecf7bd59ba64386a65f.png";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import productApi from "../../../api/productAPI";
import ProductItem from "../../../components/productItem";
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProductNewList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getListProduct = async () => {
      const res = await productApi.getProductListNewApi();
      setProducts(res.data.products);
    };
    getListProduct();
  }, []);

  return (
    <div className="product-new-list">
      <div className="product-new-list__title">
        <h1>Sản phẩm mới</h1>
      </div>
      <div className="row">
        <div className="col l-4">
          <div className="product-new-list__sidebar">
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
              className="slideBar"
            >
              {[Sidebar1, Sidebar2, Sidebar3, Sidebar4, Sidebar5].map(
                (item, index) => (
                  <SwiperSlide key={index}>
                    {<img src={item} alt="imagesidebar" />}
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
        <div className="col l-8">
          <div className="product-new-list__content">
            <Swiper
              slidesPerView={3}
              slidesPerColumn={2}
              spaceBetween={12}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className="slideProductNew"
            >
              {products.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductItem data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNewList;
