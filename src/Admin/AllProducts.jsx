import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles/All-Product.css";
import productImg from "../assets/images/arm-chair-02.jpg";
import useGetData from "../custom-hooks/useGetData";
import { RotatingLines } from "react-loader-spinner";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
const AllProducts = () => {
  const { data: productData, loading } = useGetData("products");
  // console.log(productData);

  // Delete product from admin panel
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success('Product Deleted')
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="text-center m-auto">
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
                  productData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
