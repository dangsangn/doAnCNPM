import ProductItem from "../productItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listProductExtend.css";

function showProducts(productsList) {
  let result = null;
  if (productsList.length > 0) {
    result = productsList.map((item, index) => {
      return (
        <div class="col l-12">
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            description={item.name}
            discount={50}
            image={item.link_image}
            rating={4}
          />
        </div>
      );
    });
  }
  return result;
}

function ListProductExtend(props) {
  const { data } = props;

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return <Slider {...settings}>{showProducts(data)}</Slider>;
}

export default ListProductExtend;
