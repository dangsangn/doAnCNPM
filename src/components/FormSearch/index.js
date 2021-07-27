import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../actions/actionControl";
import "./style.scss";
import history from "../../utils/history";

function FormSearch(props) {
  const [keySearch, setKeySearch] = useState();
  const listProductBySearch = useSelector(
    (state) => state.products.listProductBySearch
  );
  const dispatch = useDispatch();

  const handelChangeInput = (e) => {
    const value = e.target.value;
    setKeySearch(value);
    dispatch(actionTypes.getKeySearchProduct(value));
  };

  function showListProduct(list) {
    return list.slice(0, 5).map((item) => (
      <div
        key={item.id}
        onClick={() => redirectToProductDetailPage(item.id)}
        className="form-search__product__item"
      >
        <img src={item.link_image} alt={item.name} />
        <p className="text-clamp text-clamp--1 ">{item.name}</p>
      </div>
    ));
  }

  const redirectToProductDetailPage = (id) => {
    history.push("/productItem/" + id);
    setKeySearch("");
  };

  return (
    <div className="form-search">
      <div className="form-search">
        <input
          className="form-search__input"
          name="keySearch"
          placeholder="Sản phẩm giảm giá đến 50%"
          type="text"
          value={keySearch}
          onChange={handelChangeInput}
        />
        <button className="form-search__submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      {keySearch ? (
        <div className="form-search__show">
          <div className="form-search__product">
            {listProductBySearch.length === 0 ? (
              <p className="form-search__product__info">No product suitable</p>
            ) : (
              showListProduct(listProductBySearch)
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FormSearch;
