import React, { useEffect, useState } from "react";
import { categoryAPI } from "../../api/categoryAPI";
import CategoryItem from "../categoryItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./category.css";
function showCategories(categories) {
  let result = null;
  if (categories.length > 0) {
    result = categories.map((item, index) => {
      return (
        <CategoryItem
          key={item.id}
          id={item.id}
          categoryName={item.name}
          categoryThumbnail={item.link_image}
        />
      );
    });
  }

  let newResult = [];
  for (let i = 0; i < result.length - 1; i += 2) {
    let temp = [];
    for (let j = i; j < i + 2; j++) {
      temp.push(result[j]);
    }
    newResult.push(<div>{temp}</div>);
  }
  return newResult;
}

function Category() {
  const [categories, setCategories] = useState([]);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
  };
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
  if (categories.length === 0)
    return <p style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</p>;
  return (
    <div>
      <Slider {...settings}>{showCategories(categories)}</Slider>
    </div>
  );
}

export default Category;
