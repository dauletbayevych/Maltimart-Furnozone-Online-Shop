import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/Ui/CommonSection";
import "../styles/Checkout.css";
const Checkout = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const fastDelivery = 10;
  const navigate = useNavigate();

  const placeOrder =()=>{
    navigate('/placeOrder')
  }
  return (
    <Helmet title="- Checkout">
      <CommonSection title="Checkout"></CommonSection>
      <Container>
        <section className="checkout__section">
          <Row>
            <Col lg="8">
              <h6 className="fw-bold mb-3 fs-5">Billing Information</h6>
              <form>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your name"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Your phone no"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Street Address"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your city"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your postal code"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your Country "
                  />
                </FormGroup>
              </form>
            </Col>
            <Col lg="4" className="place__order mt-5">
              <div className="checkout__cart">
                <h6>
                  Total Quantity: <span>{totalQuantity} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  Fast Delivery: <span>${fastDelivery}</span>
                </h6>
                <h6>
                  Shipping (free): <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount + fastDelivery}</span>
                </h4>
                <button className="buy__btn Auth__btn fw-bold w-100" onClick={placeOrder}>
                  Place an Order
                </button>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Helmet>
  );
};

export default Checkout;
