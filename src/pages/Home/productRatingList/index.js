import React, { useEffect, useState } from "react";
import { Button, FormGroup } from "reactstrap";
import productApi from "../../../api/productAPI";
import ProductItem from "../../../components/productItem";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsList,
  fetchProductsList,
} from "../../../actions/productAction";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/HashLoader";
import Loading from "../../../components/loading";

const override = css`
  display: block;
  margin: 0 12px;
  border-color: red;
  float: left;
`;

function showProducts(productsList) {
  return productsList.map((item) => {
    return (
      <div className="col l-2-4" key={(item.id + 1) * Math.random()}>
        <ProductItem data={item} />
      </div>
    );
  });
}

function ProductRatingList() {
  const productsStore = useSelector((state) => state.products.listProduct);
  const dispatch = useDispatch();
  const [panigation, setPagination] = useState({
    page: 0,
  });

  let [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");

  useEffect(() => {
    const params = queryString.stringify(panigation);
    let fetchProductListApi = async () => {
      try {
        const response = await productApi.getProducts(params);
        if (panigation.page === 0) {
          dispatch(fetchProductsList(response.products));
        } else {
          dispatch(addProductsList(response.products));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductListApi();
  }, [panigation, dispatch]);

  function handleAddProductList() {
    setLoading(true);
    setPagination((pre) => {
      return { page: pre.page + 1 };
    });
  }

  return (
    <div>
      <div className="row">
        {!productsStore ? <Loading /> : showProducts(productsStore)}
      </div>
      <div className="container-btn-add-product">
        <FormGroup>
          <Button
            type="button"
            color={"primary"}
            onClick={handleAddProductList}
          >
            {
              <ClipLoader
                color={color}
                loading={loading}
                css={override}
                size={24}
              />
            }
            Xem thêm sản phẩm
          </Button>
        </FormGroup>
      </div>
    </div>
  );
}

export default ProductRatingList;
