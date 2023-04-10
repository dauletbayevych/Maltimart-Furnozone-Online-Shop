import React from "react";
import { Col, Container, Row } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import "../styles/Dashboard.css";
const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");
  return (
    <>
      <section>
        <Container>
          <Row className="">
            <Col lg="3">
              <div className="revenue__box text-center mt-3">
                <h5 className="text-white fs-5">Total Sales</h5>
                <span className="fw-bold fs-2 text-white">$7800</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="orders__box text-center mt-3">
                <h5 className="text-white fs-5">Orders</h5>
                <span
                  className="fw-bold fs-2 text-white
"
                >
                  $734
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div className="products__box text-center mt-3">
                <h5 className="text-white fs-5">Total Products</h5>
                <span className="fw-bold fs-2 text-white">
                  {products.length}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div className="users__box text-center mt-3">
                <h5 className="text-white fs-5">Total Users</h5>
                <span className="fw-bold fs-2 text-white">{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
