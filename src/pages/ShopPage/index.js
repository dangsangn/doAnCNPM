import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "./style.scss";
import ProductListNew from "../../components/productsListNew";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfoShop } from "../../actions/shop";

function ShopPage(props) {
  const params = useParams();
  const shop = useSelector((state) => state.shop);
  console.log(shop);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoShop(params.shopId, 0));
    // eslint-disable-next-line
  }, [dispatch]);

  console.log(shop);
  return (
    <div className="shop-page">
      <Container>
        <Row>
          <Col xl={2}>
            <div className="shop-page__menu">
              <div className="shop-page__author">
                <div className="shop-page__author__container">
                  <div className="shop-page__author__img">
                    <img
                      src={
                        shop?.img
                          ? shop.img
                          : "https://cf.shopee.vn/file/afa4d8cf9051fa1278cf3c854d406480_tn"
                      }
                      alt="imgShop"
                    />
                  </div>
                  <div className="shop-page__author__name">
                    {shop.name_shop}
                  </div>
                </div>
              </div>
              <div className="shop-page__menu-area">
                <ul className="shop-page__menu-area__category-shop">
                  <h2>DANH MỤC SHOP</h2>
                  <li className="shop-page__menu-area__category-shop__item">
                    <a className="active" href="#1">
                      Sản phẩm
                    </a>
                  </li>
                  <li className="shop-page__menu-area__category-shop__item">
                    <a href="#1">Quần Jean</a>
                  </li>
                  <li className="shop-page__menu-area__category-shop__item">
                    <a href="#1">Aó sơ mi</a>
                  </li>
                  <li className="shop-page__menu-area__category-shop__item">
                    <a href="#1">Quần đùi</a>
                  </li>
                  <li className="shop-page__menu-area__category-shop__item">
                    <a href="#1">Aó polo</a>
                  </li>
                </ul>
                <ul className="shop-page__menu-area__checkbox-menu shop-page__menu-area__about-category">
                  <h2>THEO DANH MỤC</h2>
                  <Form.Check
                    type="checkbox"
                    id="quanjean"
                    label="Quần Jean"
                    custom
                  />
                  <Form.Check
                    type="checkbox"
                    id="aosomi"
                    label="Aó sơ mi"
                    custom
                  />
                  <Form.Check
                    type="checkbox"
                    id="quandui"
                    label="Quần đùi"
                    custom
                  />
                  <Form.Check
                    type="checkbox"
                    id="aopolo"
                    label="Aó polo"
                    custom
                  />
                </ul>
              </div>
            </div>
          </Col>
          <Col xl={10}>
            <div className="shop-page__product">
              <ProductListNew productsList={shop.products} xl={3} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShopPage;
