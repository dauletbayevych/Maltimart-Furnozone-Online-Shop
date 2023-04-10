import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="pt-3">
          <Col lg="4" md="3" className="pt-2">
            <div className="logo">
              <div>
                <h1 className="text-white fs-3">Furnizone</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt aut
              fugit similique ad quasi culpa quos, suscipit ut corporis. Ex?
            </p>
          </Col>
          <Col lg="3" md="3" className="mb-3">
            <div className="footer__quick_link">
              <h4 className="quick__link_title">Top Categories</h4>
              <ListGroup className="mt-3 ">
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue "
                    to="#"
                  >
                    Mobile phones
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    Modern Sofa
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    Arm Chair
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    Smart Watch
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    New Arrivals
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-3">
            <div className="footer__quick_link">
              <h4 className="quick__link_title">Useful Links</h4>
              <ListGroup className="mt-3">
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="/shop"
                  >
                    Shop
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="/cart"
                  >
                    Cart
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="/login"
                  >
                    Login
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    Privacy Policy
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none">
                  <Link
                    className="text-decoration-none text-black hover:text-blue"
                    to="#"
                  >
                    Terms & Conditions
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4" className="mb-3">
            <div className="footer__quick_link">
              <h4 className="quick__link_title">Contact</h4>
              <ListGroup className="mt-3">
                <ListGroupItem className="ps-0 border-0 text-decoration-none d-flex align-items-center gap-2 ">
                  <span>
                    <i className="ri-map-pin-line bg-white fs-3 rounded"></i>
                  </span>
                  <p className="mb-2">Muktagacha, Mymensingh, Dhaka</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none  d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line bg-white fs-3 rounded"></i>
                  </span>
                  <p className="mb-2">+880 123434324</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-decoration-none  d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line bg-white fs-3 rounded"></i>
                  </span>
                  <p className="mb-2">example124@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <hr className="m-3" />
        </Row>
        <Col lg="12" className="text-center py-3 copyright">
          Copyright {year} Developed by Abu Raihan. All right reserved.
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
