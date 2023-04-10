import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success("User logged in successfully");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title="Login">
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
                <h3 className="fs-bold text-center ">Login</h3>
                <form className="auth__form" onSubmit={signIn}>
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
                  <button
                    type="submit"
                    className="buy__btn auth__btn  text-center"
                  >
                    Login
                  </button>
                  <p className="mt-2 ">
                    Don't have an account?{" "}
                    <Link className="text-decoration-none" to="/signup">
                      Create an account
                    </Link>
                  </p>
                </form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
