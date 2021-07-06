import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./style.css";

function showItem(data, numCol, id) {
  let result = null;
  if (data.length > 0) {
    result = data.map((item, index) => {
      return (
        <div class={`col l-12 img-carousel`}>
          <img src={item.src} alt="img" key={index} />
        </div>
      );
    });
  }
  return result;
}

function Carousel(props) {
  const { data, numItem, numCol } = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: numItem,
    slidesToScroll: numItem,
  };
  return <Slider {...settings}>{showItem(data, numCol)}</Slider>;
}

export default Carousel;
