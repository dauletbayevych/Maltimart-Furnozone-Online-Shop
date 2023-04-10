import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Login.css";
import { RotatingLines } from "react-loader-spinner";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { storage } from "../firebase.config";

import { toast } from "react-toastify";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });

            // Store user data in firebase database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      toast.success("Account created successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section className="login__section">
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="">
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
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fs-bold text-center ">Sign-up</h3>
                <form className="auth__form" onSubmit={signup}>
                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>
                  <button
                    type="submit"
                    className="buy__btn auth__btn  text-center"
                  >
                    Creat an account
                  </button>
                  <p className="mt-2">
                    Already have an account?{" "}
                    <Link className="text-decoration-none" to="/login">
                      Please login here
                    </Link>
                  </p>
                </form>
              </Col>
            )}
            {/* <Col lg="6  ">
              <div>
                <img src={login} alt="" />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
