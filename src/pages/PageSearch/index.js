import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import ProductItem from "../../components/productItem";
import * as actionTypesProductInCategory from "./../../actions/product-in-category";
import queryString from "query-string";
import "./style.css";

function showProductList(products) {
  let result = null;
  if (products.length > 0) {
    result = products.map((item) => {
      return (
        <div class="col l-2-4">
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            description={item.name}
            discount={50}
            image={item.link_image}
            rating={4}
            soldQuantity={item.count}
          />
        </div>
      );
    });
  }
  return result;
}

function PageSearch(props) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productsInCategory = useSelector((state) => state.productInCategory);
  const { search } = useLocation();
  const name_find = queryString.parse(search).name_find;

  useEffect(() => {
    const fetchProductsListCategoryAPI = async () => {
      try {
        const response = await axios.get(
          `https://your-ecommerce.herokuapp.com/search${search}&page=0`
        );
        console.log(response);
        setProducts(response.data.products);
        dispatch(
          actionTypesProductInCategory.fetchProductInCategory(
            response.data.products
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsListCategoryAPI();
  }, [dispatch, search]);

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
    <div className="grid wide" style={{ marginTop: "150px" }}>
      <div className="row">
        <div className="col l-12">
          Kết quả tìm kiếm cho ` {name_find} `:{" "}
          <strong>{products.length}</strong> kết quả
        </div>
      </div>
      <div className="row">
        <div className="col l-6">
          <nav class="nav nav-pills nav-fill nav-controll-product">
            <button
              class="btn btn-primary btn-controll-product-link"
              onClick={handelPopularProduct}
            >
              Phổ Biến
            </button>
            <button
              class="btn btn-primary btn-controll-product-link"
              onClick={handelDiscountProduct}
            >
              Giảm giá
            </button>
            <button class="btn btn-primary btn-controll-product-link">
              Hàng Mới
            </button>
            <button
              class="btn btn-primary btn-controll-product-link"
              onClick={handelInscreaseProduct}
            >
              Giá Thấp
            </button>
            <button
              class="btn btn-primary btn-controll-product-link"
              onClick={handelDescreaseProduct}
            >
              Giá Cao
            </button>
          </nav>
        </div>
      </div>

      <div className="row">
        {!products ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          showProductList(products)
        )}
      </div>
    </div>
  );
}

export default PageSearch;
