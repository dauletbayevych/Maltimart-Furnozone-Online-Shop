import React from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Cart.css";
import CommonSection from "../components/Ui/CommonSection";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(totalAmount);

  return (
    <Helmet title={"Cart"}>
      <CommonSection title="Shopping cart" />
      <Container>
        <section className="cart__section">
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Subtotal</h4>
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </div>
              <p>Taxes and shipping will calculate in checkout</p>
              <div>
                <button className="buy__btn  ">
                  <Link to="/shop">Continue Shopping</Link>
                </button>

                <button className="buy__btn ">
                  <Link to="/checkout">Checkout </Link>
                </button>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <>
      <tr>
        <td>
          <img src={item.imgUrl} alt={item.productName} />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            onClick={deleteItem}
            className="ri-delete-bin-line"
          ></motion.i>
        </td>
      </tr>
    </>
  );
};
export default Cart;
