import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import ProductDetail from "../../components/product-detail";
import ProductDiscountList from "../Home/productDiscoutList";
import Review from "./review";

function ProductDetailPage(props) {
  const [product, setProduct] = useState();
  const { match } = props;

  const pathName = match.params.productId;
  useEffect(() => {
    const fetchProductAPI = async () => {
      try {
        const response = await axios.get(
          `https://your-ecommerce.herokuapp.com/products/${pathName}`
        );
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductAPI();
  }, [pathName]);

  return (
    <div>
      <div className="grid wide">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Danh sách sản phẩm</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product?.name}
            </li>
          </ol>
        </nav>
      </div>
      {!product ? (
        <Loading />
      ) : (
        <>
          <ProductDetail dataProduct={product} />
          <Review dataProduct={product} />
        </>
      )}

      <div className="grid wide">
        <ProductDiscountList />
      </div>
    </div>
  );
}

export default ProductDetailPage;
