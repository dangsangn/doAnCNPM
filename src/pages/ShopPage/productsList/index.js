import React from "react";
import ProductItem from "../../../components/productItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading";

function showProducts(productsList, xl) {
  let result = null;
  if (productsList?.length > 0) {
    result = productsList.map((item) => {
      return (
        <Col xl={xl} key={item.id}>
          <ProductItem data={item} />
        </Col>
      );
    });
  }
  return result;
}

function ProductList(props) {
  const { productsList, xl } = props;
  console.log(productsList);
  const showLoading = useSelector((state) => state.ui.showLoading);

  return (
    <Row>{showLoading ? <Loading /> : showProducts(productsList, xl)}</Row>
  );
}

export default ProductList;
