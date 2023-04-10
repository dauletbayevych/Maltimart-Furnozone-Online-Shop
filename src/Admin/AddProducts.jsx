import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import "../styles/Add-product.css";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImage, setEnterProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   description: enterDescription,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl: enterProductImage,
    // };
    // console.log(product);

    // ========= Added Product to the firebase =========

    try {
      // const docRef = addDoc(collection(db, "products"));
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImage/${Date.now() + enterProductImage.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImage);

      uploadTask.on(
        () => {
          toast.error("Image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product successfully added");
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      toast.error("Product not added");
    }
  };
  return (
    <section className="">
      <Container>
        <Row>
          <Col className="m-auto text-center" lg="6">
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
              <>
                <h4>Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product Title</span>
                    <input
                      type="text"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      placeholder="Double sofa"
                      className="form-control"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      required
                      type="text"
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      className="form-control"
                      placeholder="Lorem..."
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span> Description</span>
                    <textarea
                      placeholder="Description..."
                      className="form-control"
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      cols="30"
                      rows="5"
                    ></textarea>
                  </FormGroup>

                  <div>
                    <FormGroup className="form__group">
                      <span> Price</span>
                      <input
                        required
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        type="number"
                        placeholder="$100..."
                        className="form-control"
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span> Category</span>
                      <select
                        className="form-control"
                        required
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option>Select your Category</option>
                        <option value="plant">Plant</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span> Product Image</span>
                      <input
                        required
                        type="file"
                        className="form-control"
                        // value={enterProductImage}
                        onChange={(e) =>
                          setEnterProductImage(e.target.files[0])
                        }
                      />
                    </FormGroup>
                  </div>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    type="submit"
                    className="buy__btn"
                  >
                    Add Product
                  </motion.button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
