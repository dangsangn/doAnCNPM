import React from "react";
import ProductItem from "../productItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";

function showProducts(productsList, xl) {
  let result = null;
  if (productsList?.length > 0) {
    result = productsList.map((item) => {
      return (
        <Col xl={xl} key={item.id}>
          <ProductItem
            id={item.id}
            title={item.name}
            price={item.price}
            description={item.name}
            discount={50}
            image={item.link_image}
            rating={5}
          />
        </Col>
      );
    });
  }
  return result;
}

function ProductList(props) {
  const { productsList, xl } = props;
  const showLoading = useSelector((state) => state.ui.showLoading);

  return (
    <Row>{showLoading ? <Loading /> : showProducts(productsList, xl)}</Row>
  );
}

export default ProductList;
