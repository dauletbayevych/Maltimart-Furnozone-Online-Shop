import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Error.css";

const Error = () => {
  return (
    <Helmet title=" Error">
      <Container className="Error__container">
        <Row>
          <Col lg="12">
            <h2>404! Page not found.</h2>
            <h4>
              <Link to="/home">Back to home</Link>
            </h4>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Error;
