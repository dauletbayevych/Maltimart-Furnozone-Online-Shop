import React from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/PlaceOrder.css";
import imgGif from "../assets/welcome-greeting.gif";
const PlaceOrder = () => {
  return (
    <Helmet title="Order-Confirm">
      <section className="place__order text-center">
        <Container>
          <Row>
            <Col className="text-center m-auto" lg="6">
              <div className="greeting__gif">
                <img className="img-fluid" src={imgGif} alt="" />
                <h3 className="mt-3">
                  Thanks for your order! <br />
                  Your Order is successfully confirmed.
                </h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PlaceOrder;
