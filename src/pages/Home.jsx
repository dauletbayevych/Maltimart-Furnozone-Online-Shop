import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import heroImg from "../assets/images/hero-image.png";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductList from "../components/Ui/ProductList";
import products from "../assets/data/products";
import counterImg from "../assets/images/counter-timer-img.png";
import Clock from "../components/Ui/Clock";
import useGetData from "../custom-hooks/useGetData";
import { RotatingLines } from "react-loader-spinner";
const Home = () => {
  const { data: products, loading } = useGetData("products");
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSalesProduct, setBestSalesProduct] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "plant"
    );
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filteredPopularCategory = products.filter(
      (item) => item.category === "watch"
    );
    setTrendingProduct(filteredTrendingProducts);
    setBestSalesProduct(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularCategory);
  }, [products]);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row className="d-flex align-items-center justify-content-between">
            <Col lg="6" md="6" sm="12">
              <div className="hero__content">
                <p className="hero__subtitle">Trending Product in {year}</p>
                <h2>Let's Make Your Interior More Beautiful & Modern</h2>
                <p>
                  Modern design is an interior design style characterized by a
                  monochromatic color palette, clean lines, minimalism, natural
                  materials, and natural light. It refers specifically to a
                  historical aesthetic movement that took place during the early
                  to mid-twentieth century.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            {/* Hero image */}
            <Col lg="6" md="6" sm="12">
              <div className="hero__img">
                <img src={heroImg} alt="heroImage" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      {/* trending products  */}
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">
                A Huge Collection of Furniture Products for your interior
              </h2>
              <p className="w-75 text-center m-auto">
                If you are looking for quality design furniture's? Then welcome
                we have different types of furniture waiting for delivery.
              </p>
            </Col>
            {loading ? (
              <div className="text-center">
                <RotatingLines
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <ProductList data={trendingProduct} />
            )}
          </Row>
        </Container>
      </section>

      {/* Best sales products  */}
      <section className="bestSales__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales Products</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <RotatingLines
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <ProductList data={bestSalesProduct} />
            )}
          </Row>
        </Container>
      </section>

      {/* Time counter */}
      <section className="timer__counter ">
        <Container>
          <Row className="d-flex justify-content-between ">
            <Col lg="6" md="12" sm="12" className="col__center">
              <div className="clock__top-counter">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-4 ">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.1 }} className="store__btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" sm="12" className="text-end counter__image">
              <img className="img-fluid" src={counterImg} alt="counter image" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* new arrivals */}
      <section className="new__arrival">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <RotatingLines
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <ProductList data={mobileProducts} />
            )}
          </Row>
        </Container>
      </section>

      {/* Popular category */}
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Popular Categories</h2>
            </Col>
            {loading ? (
              <div className="text-center">
                <RotatingLines
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <ProductList data={popularProducts} />
            )}
            {loading ? (
              <div className="text-center">
                <RotatingLines
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <ProductList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      {/* News Later */}
      <section className="news__later">
        <Container>
          <Row>
            <Col lg="12" className="text-center m-auto">
              <h2 className="section__title text-white">
                Subscribe for get latest news update about products
              </h2>
              <p className="text-center">
                Everyday we make new product and supply to the customer & taking
                order <br /> regularly. Also add our website. Subscribe for
                update.
              </p>
              <div className="subscribe__box  ">
                <input
                  type="text"
                  className="form-control w-50 m-auto "
                  placeholder="Enter your email"
                />
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  Subscribe
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
