import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import useAuth from "../../custom-hooks/useAuth";
import "./Header.css";

import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";
const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "cart",
    display: "Cart",
  },
  {
    path: "shop",
    display: "Shop",
  },
];
const Header = () => {
  // const headerRef = useRef(null);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // const stickyHeaderFunc = () => {
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       headerRef.current.classList.add("sticky__header");
  //     } else {
  //       headerRef.current.classList.remove("sticky__header");
  //     }
  //   });
  // };
  // useEffect(() => {
  //   stickyHeaderFunc();
  //   return () => window.removeEventListener("scroll", stickyHeaderFunc);
  // });

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out ");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const toggleMenu = () => menuRef.current.classList.toggle("nav__active");

  const goToAddCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__ProfileAction");

  return (
    <header className="header fixed-top bg-white">
      <Container>
        <Row>
          <div className="nav__wrapper ">
            {/* logo */}
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
              <Link className="text-decoration-none" to="/">
                <h1>Furnizone</h1>
              </Link>
            </div>

            {/* Navigation */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="nav__link">
                <ul className="menu">
                  {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Nav Icon */}
            <div className="nav__icon">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon" onClick={goToAddCart}>
                {/* <Link to="/cart"> */}
                <i className="ri-shopping-bag-line deco-none"></i>
                {/* </Link> */}
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  // src={userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__action"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <ul>
                      <li onClick={logout}>Logout</li>
                      <li>
                        <Link
                          className="text-decoration-none text-black"
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column rounded">
                      <Link
                        className="text-decoration-none text-black"
                        to="/signup"
                      >
                        SignUp
                      </Link>
                      <Link
                        className="text-decoration-none text-black"
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="text-decoration-none text-black"
                        to="/login"
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {/* Mobile menu */}
              <div className="mobile__menu">
                <span onClick={toggleMenu}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
