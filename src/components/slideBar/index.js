import "./slide.css";
import Carousel from "react-bootstrap/Carousel";

function SlideBar() {
  const listImg = [
    {
      src: "images/slidebar/slidebar1.jfif",
    },
    {
      src: "images/slidebar/slidebar2.jfif",
    },
    {
      src: "images/slidebar/slidebar3.jfif",
    },
    {
      src: "images/slidebar/slidebar4.jfif",
    },
    {
      src: "images/slidebar/slidebar5.jfif",
    },
    {
      src: "images/slidebar/slidebar6.jfif",
    },
    {
      src: "images/slidebar/slidebar7.jfif",
    },
  ];

  function showSlide(items) {
    return items.map((item, index) => {
      return (
        <Carousel.Item key={index} interval={2000}>
          <img className="d-block w-100" src={item.src} alt="First slide" />
        </Carousel.Item>
      );
    });
  }

  return (
    <div className="slide-bar__container">
      <Carousel>{showSlide(listImg)}</Carousel>
    </div>
  );
}

export default SlideBar;
