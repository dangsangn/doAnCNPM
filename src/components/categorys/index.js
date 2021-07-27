import React, { useEffect, useState } from "react";
import { categoryAPI } from "../../api/categoryAPI";
import CategoryItem from "../categoryItem";
import Loading from "../loading";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import "./category.scss";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

function showCategories(categories) {
  return categories.map((item) => (
    <SwiperSlide key={item.id}>
      <CategoryItem
        id={item.id}
        categoryName={item.name}
        categoryThumbnail={item.link_image}
      />
    </SwiperSlide>
  ));
}

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let fetchCategoriesAPI = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.categories);
      } catch (error) {
        console.log(error);
      }
    }; //
    fetchCategoriesAPI();
  }, []);

  if (categories.length === 0) return <Loading />;
  return (
    <>
      <Swiper
        slidesPerView={10}
        slidesPerColumn={2}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {showCategories(categories)}
      </Swiper>
    </>
  );
}

export default Category;
