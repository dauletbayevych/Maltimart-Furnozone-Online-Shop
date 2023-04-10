import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/Ui/CommonSection";
import { cartActions } from "../redux/slices/cartSlice";
import "../styles/Product-details.css";
import ProductList from "../components/Ui/ProductList";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { RotatingLines } from "react-loader-spinner";

const ProductDetails = () => {
  const [product, setProducts] = useState({});
  const { id } = useParams();
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const [rating, setRating] = useState(null);

  // const product = products.find((item) => item.id === id);

  const { data: products, loading } = useGetData("products");

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProducts(docSnap.data());
      } else {
        console.log("No product");
      }
    };
    getProduct();
  }, []);
  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName,
        image: imgUrl,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  const relatedProduct = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      userMsg: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success("Review submitted successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <div>
      <Helmet title={productName}>
        <CommonSection title={productName} />
        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="6">
                <img src={imgUrl} alt="" />
              </Col>
              <Col lg="6">
                <div className="product__details">
                  <h2 className="mt-3">{productName}</h2>
                  <div className="product__rating d-flex  gap-3">
                    <div>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-half-s-fill"></i>
                      </span>
                    </div>
                    <p>{/* ( <span>{avgRating}</span> ratings){" "} */}</p>
                  </div>
                  <div className="d-flex align-items-center  gap-5">
                    <span className="product__price">${price}</span>
                    <span>Category: {category}</span>
                  </div>
                  <p className="mt-3">{shortDesc}</p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    onClick={addToCart}
                    className="buy__btn"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
          {/* Review and description section */}
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper d-flex align-items-center gap-5 mt-4">
                  <h6
                    className={`${tab === "desc" ? "active__tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${tab === "review" ? "active__tab" : ""}`}
                    onClick={() => setTab("review")}
                  >
                    {" "}
                    Review
                  </h6>
                </div>
                {tab === "desc" ? (
                  <div className="tab__content mt-5">
                    <p>{description}</p>
                  </div>
                ) : (
                  <p className="mt-5 product__review">
                    <div className="review__wrapper">
                      {/* <ul>
                        {reviews?.map((item, index) => (
                          <li key={index}>
                            <h6 className="text-black">John Doe</h6>
                            <span>{item.rating} (rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul> */}

                      <div className="review__form">
                        <h4 className="text-black mb-4">
                          Leave your experience bellow
                        </h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className="form__group">
                            {/* <input type="text" placeholder="Enter your name" /> */}
                            {/* <label for="exampleInputEmail1">
                              Email address
                            </label> */}
                            <input
                              placeholder="Enter your name"
                              type="text"
                              class="form-control"
                              ref={reviewUser}
                              required
                            />
                          </div>

                          <div className="form__group d-flex align-item-center gap-5">
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(1)}
                            >
                              1<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(2)}
                            >
                              2<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(3)}
                            >
                              3<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(4)}
                            >
                              4<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(5)}
                            >
                              5<i className="ri-star-s-fill"></i>
                            </motion.span>
                          </div>

                          <div className="form__group">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              placeholder="Enter your message here"
                              ref={reviewMsg}
                              required
                            ></textarea>
                          </div>

                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            className="buy__btn"
                          >
                            Submit
                          </motion.button>
                        </form>
                      </div>
                    </div>
                  </p>
                )}
              </Col>

              <Col lg="12">
                <h2 className="related__title">You might also like </h2>
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
                <ProductList data={relatedProduct} />
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default ProductDetails;
