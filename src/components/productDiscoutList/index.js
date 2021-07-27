import React, { useEffect, useState } from "react";
import productApi from "../../api/productAPI";
import ListProductExtend from "../listProductExtend";
import Loading from "../loading";

function ProductDiscountList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let fetchProductsDiscountAPI = async () => {
      try {
        const response = await productApi.getProductsDiscount("page=0");
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
      {!products ? <Loading /> : <ListProductExtend data={products} />}
    </div>
  );
}

export default ProductDiscountList;
