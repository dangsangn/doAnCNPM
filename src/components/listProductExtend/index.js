import ProductItem from "../productItem";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function showProducts(productsList) {
  let result = null;
  if (productsList.length > 0) {
    result = productsList.map((item) => {
      return (
        <SwiperSlide key={item.id}>
          <ProductItem
            id={item.id}
            title={item.name}
            price={item.price}
            description={item.name}
            discount={50}
            image={item.link_image}
            rating={4}
          />
        </SwiperSlide>
      );
    });
  }
  return result;
}

function ListProductExtend(props) {
  const { data } = props;

  return (
    <div className="product-extend">
      <Swiper
        slidesPerView={5}
        spaceBetween={16}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {showProducts(data)}
      </Swiper>
    </div>
  );
}

export default ListProductExtend;
